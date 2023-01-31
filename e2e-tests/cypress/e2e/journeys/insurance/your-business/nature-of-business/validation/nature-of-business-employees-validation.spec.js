import { natureOfBusiness } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const {
  NATURE_OF_YOUR_BUSINESS: {
    EMPLOYEES_UK,
    EMPLOYEES_INTERNATIONAL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - number of employees input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`${EMPLOYEES_UK} validation`, () => {
    describe(`when ${EMPLOYEES_UK} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].IS_EMPTY;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        field.input().clear();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        cy.checkText(partials.errorSummaryListItems().eq(2), errorMessage);
      });

      it(`should focus to the ${EMPLOYEES_UK} section when clicking the error`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        partials.errorSummaryListItemLinks().eq(2).click();
        field.input().should('have.focus');
      });

      it(`should display the validation error for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${EMPLOYEES_UK} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5.5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        cy.checkText(partials.errorSummaryListItems().eq(2), errorMessage);
      });

      it(`should display the validation error for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${EMPLOYEES_UK} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('3S');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        cy.checkText(partials.errorSummaryListItems().eq(2), errorMessage);
      });

      it(`should display the validation error for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered as a whole number`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered with a comma`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5,000');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });
  });

  describe(`${EMPLOYEES_INTERNATIONAL} validation`, () => {
    describe(`when ${EMPLOYEES_INTERNATIONAL} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].IS_EMPTY;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        field.input().clear();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        cy.checkText(partials.errorSummaryListItems().eq(3), errorMessage);
      });

      it(`should focus to the ${EMPLOYEES_INTERNATIONAL} section when clicking the error`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        partials.errorSummaryListItemLinks().eq(3).click();
        field.input().should('have.focus');
      });

      it(`should display the validation error for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5.5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        cy.checkText(partials.errorSummaryListItems().eq(3), errorMessage);
      });

      it(`should display the validation error for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('3S');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        cy.checkText(partials.errorSummaryListItems().eq(3), errorMessage);
      });

      it(`should display the validation error for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        cy.checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is correctly entered as a whole number`, () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is correctly entered with a comma`, () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5,000,000');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });
  });
});
