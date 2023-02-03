import { turnover } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

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
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`${FIELD_ID} error`, () => {
    describe(`when ${FIELD_ID} is left empty`, () => {
      const errorMessage = ERROR_MESSAGE.IS_EMPTY;

      it(`should display validation errors if ${FIELD_ID} left empty`, () => {
        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe(`when ${FIELD_ID} is a decimal place number`, () => {
      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

      it(`should display validation errors for ${FIELD_ID}`, () => {
        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = '5.5';

        cy.submitAndAssertErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe(`when ${FIELD_ID} has special characters`, () => {
      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

      it(`should display validation errors for ${FIELD_ID}`, () => {
        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = '5O';

        cy.submitAndAssertErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });
  });

  describe(`when ${FIELD_ID} is correctly entered as a whole number`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = FIELD_ID;
      const field = turnover[fieldId];

      field.input().clear().type('5');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });

  describe(`when ${FIELD_ID} is correctly entered with a comma`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = FIELD_ID;
      const field = turnover[fieldId];

      field.input().clear().type('5,00');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });

  describe(`when ${FIELD_ID} is correctly entered as 0`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = FIELD_ID;
      const field = turnover[fieldId];

      field.input().clear().type('0');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });
});
