import { turnover } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

const TURNOVER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
  },
} = FIELD_IDS;

describe(`Insurance - Your business - Turnover page - form validation - ${ESTIMATED_ANNUAL_TURNOVER}`, () => {
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

  describe(`${ESTIMATED_ANNUAL_TURNOVER} error`, () => {
    describe(`when ${ESTIMATED_ANNUAL_TURNOVER} is left empty`, () => {
      const errorMessage = TURNOVER_ERRORS[ESTIMATED_ANNUAL_TURNOVER].IS_EMPTY;

      it(`should display validation errors if ${ESTIMATED_ANNUAL_TURNOVER} left empty`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);
      });

      it(`should focus to the ${ESTIMATED_ANNUAL_TURNOVER} section when clicking the error`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        partials.errorSummaryListItemLinks().first().click();
        field.input().should('have.focus');
      });

      it(`should display the validation error for ${ESTIMATED_ANNUAL_TURNOVER}`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${ESTIMATED_ANNUAL_TURNOVER} is a decimal place number`, () => {
      const errorMessage = TURNOVER_ERRORS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;

      it(`should display validation errors for ${ESTIMATED_ANNUAL_TURNOVER}`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear().type('5.5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);
      });

      it(`should display the validation error for ${ESTIMATED_ANNUAL_TURNOVER}`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${ESTIMATED_ANNUAL_TURNOVER} has special characters`, () => {
      const errorMessage = TURNOVER_ERRORS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;

      it(`should display validation errors for ${ESTIMATED_ANNUAL_TURNOVER}`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear().type('5O');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);
      });

      it(`should display the validation error for ${ESTIMATED_ANNUAL_TURNOVER}`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });
  });

  describe(`when ${ESTIMATED_ANNUAL_TURNOVER} is correctly entered as a whole number`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = ESTIMATED_ANNUAL_TURNOVER;
      const field = turnover[fieldId];

      field.input().clear().type('5');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });

  describe(`when ${ESTIMATED_ANNUAL_TURNOVER} is correctly entered with a comma`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = ESTIMATED_ANNUAL_TURNOVER;
      const field = turnover[fieldId];

      field.input().clear().type('5,00');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });

  describe(`when ${ESTIMATED_ANNUAL_TURNOVER} is correctly entered as 0`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = ESTIMATED_ANNUAL_TURNOVER;
      const field = turnover[fieldId];

      field.input().clear().type('0');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });
});
