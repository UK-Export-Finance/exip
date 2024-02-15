import partials from '../../../../../../../partials';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';

const {
  TURNOVER: {
    PERCENTAGE_TURNOVER: FIELD_ID,
  },
} = FIELD_IDS;

const TURNOVER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const ERROR_MESSAGE = TURNOVER_ERRORS[FIELD_ID];

// for error assertion - common fields
const ERROR_ASSERTIONS = {
  field: fieldSelector(FIELD_ID),
  numberOfExpectedErrors: 2,
  errorIndex: 1,
};

const baseUrl = Cypress.config('baseUrl');

describe(`Insurance - Your business - Turnover page - form validation - ${FIELD_ID}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should display validation errors when ${FIELD_ID} left empty`, () => {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = null;

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors whe ${FIELD_ID} is a decimal place number`, () => {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '5.5';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors whe ${FIELD_ID} has a comma`, () => {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '4,4';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors when ${FIELD_ID} has special characters`, () => {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '5O';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors when ${FIELD_ID} is over 100`, () => {
    const errorMessage = ERROR_MESSAGE.ABOVE_MAXIMUM;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '101';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors whe ${FIELD_ID} is below 0`, () => {
    const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = '-1';

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as a whole number`, () => {
    const field = fieldSelector(FIELD_ID);

    cy.keyboardInput(field.input(), '5');

    cy.clickSubmitButton();

    partials.errorSummaryListItems().should('have.length', 1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as 0`, () => {
    const field = fieldSelector(FIELD_ID);

    cy.keyboardInput(field.input(), '0');

    cy.clickSubmitButton();

    partials.errorSummaryListItems().should('have.length', 1);
  });
});
