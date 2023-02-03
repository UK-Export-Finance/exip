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
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS;

describe(`Insurance - Your business - Turnover page - form validation - ${PERCENTAGE_TURNOVER}`, () => {
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

  describe(`${PERCENTAGE_TURNOVER} error`, () => {
    describe(`when ${PERCENTAGE_TURNOVER} is left empty`, () => {
      const errorMessage = TURNOVER_ERRORS[PERCENTAGE_TURNOVER].IS_EMPTY;

      it(`should display validation errors if ${PERCENTAGE_TURNOVER} left empty`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should focus to the ${PERCENTAGE_TURNOVER} section when clicking the error`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        partials.errorSummaryListItemLinks().eq(1).click();
        field.input().should('have.focus');
      });

      it(`should display the validation error for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${PERCENTAGE_TURNOVER} is a decimal place number`, () => {
      const errorMessage = TURNOVER_ERRORS[PERCENTAGE_TURNOVER].INCORRECT_FORMAT;

      it(`should display validation errors for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear().type('5.5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should display the validation error for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${PERCENTAGE_TURNOVER} has special characters`, () => {
      const errorMessage = TURNOVER_ERRORS[PERCENTAGE_TURNOVER].INCORRECT_FORMAT;

      it(`should display validation errors for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear().type('5O');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should display the validation error for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${PERCENTAGE_TURNOVER} is over 100`, () => {
      const errorMessage = TURNOVER_ERRORS[PERCENTAGE_TURNOVER].ABOVE_MAXIMUM;

      it(`should display validation errors for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear().type('120');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should display the validation error for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${PERCENTAGE_TURNOVER} is below 0`, () => {
      const errorMessage = TURNOVER_ERRORS[PERCENTAGE_TURNOVER].BELOW_MINIMUM;

      it(`should display validation errors for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        field.input().clear().type('-15');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 2);
        cy.checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should display the validation error for ${PERCENTAGE_TURNOVER}`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = turnover[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });
  });

  describe(`when ${PERCENTAGE_TURNOVER} is correctly entered as a whole number`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = PERCENTAGE_TURNOVER;
      const field = turnover[fieldId];

      field.input().clear().type('5');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });

  describe(`when ${PERCENTAGE_TURNOVER} is correctly entered with a comma`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = PERCENTAGE_TURNOVER;
      const field = turnover[fieldId];

      field.input().clear().type('5,0');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });

  describe(`when ${PERCENTAGE_TURNOVER} is correctly entered as 0`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = PERCENTAGE_TURNOVER;
      const field = turnover[fieldId];

      field.input().clear().type('0');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
    });
  });
});
