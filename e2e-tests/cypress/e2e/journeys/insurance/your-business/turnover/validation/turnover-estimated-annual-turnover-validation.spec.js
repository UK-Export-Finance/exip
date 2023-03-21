import { turnover } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER: FIELD_ID,
  },
} = FIELD_IDS;

const TURNOVER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const ERROR_MESSAGE = TURNOVER_ERRORS[FIELD_ID];

// for error assertion - common fields
const ERROR_ASSERTIONS = {
  field: turnover[FIELD_ID],
  numberOfExpectedErrors: 2,
  errorIndex: 0,
};

describe(`Insurance - Your business - Turnover page - form validation - ${FIELD_ID}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should display validation errors when ${FIELD_ID} is left empty`, () => {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = null;

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors when ${FIELD_ID} is a decimal place number`, () => {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '5.5';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors when ${FIELD_ID} has special characters`, () => {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '5O';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors when ${FIELD_ID} is negative but has a decimal place`, () => {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '-256.123';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as a whole number`, () => {
    const fieldId = FIELD_ID;
    const field = turnover[fieldId];

    cy.keyboardInput(field.input(), '5');
    submitButton().click();
    partials.errorSummaryListItems().should('have.length', 1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered with a comma`, () => {
    const fieldId = FIELD_ID;
    const field = turnover[fieldId];

    cy.keyboardInput(field.input(), '5,00');
    submitButton().click();
    partials.errorSummaryListItems().should('have.length', 1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as 0`, () => {
    const fieldId = FIELD_ID;
    const field = turnover[fieldId];

    cy.keyboardInput(field.input(), '0');
    submitButton().click();
    partials.errorSummaryListItems().should('have.length', 1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as a negative number`, () => {
    const fieldId = FIELD_ID;
    const field = turnover[fieldId];

    cy.keyboardInput(field.input(), '-256');
    submitButton().click();
    partials.errorSummaryListItems().should('have.length', 1);
  });
});
