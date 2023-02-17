import { natureOfBusiness } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

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

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe(`${EMPLOYEES_UK} validation`, () => {
    // for error assertion - common fields
    const ERROR_ASSERTIONS = {
      expectedErrorsCount: 4,
      errorIndex: 2,
    };

    describe(`when ${EMPLOYEES_UK} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].IS_EMPTY;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_UK} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '5.5';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_UK} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '3S';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered as 0`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        cy.keyboardInput(field.input(), '0');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered as a whole number`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        cy.keyboardInput(field.input(), '5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered with a comma`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = natureOfBusiness[fieldId];

        cy.keyboardInput(field.input(), '5,000');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });
  });

  describe(`${EMPLOYEES_INTERNATIONAL} validation`, () => {
    // for error assertion - common fields
    const ERROR_ASSERTIONS = {
      expectedErrorsCount: 4,
      errorIndex: 3,
    };
    describe(`when ${EMPLOYEES_INTERNATIONAL} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].IS_EMPTY;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '5.5';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '3S';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is 0`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].BELOW_MINIMUM;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        natureOfBusiness[EMPLOYEES_UK].input().clear();

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '0';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is below the value of ${EMPLOYEES_UK}`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].BELOW_UK;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        cy.keyboardInput(natureOfBusiness[EMPLOYEES_UK].input(), '20');
        const value = '10';

        cy.submitAndAssertFieldErrors(field, value, 2, 3, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is correctly entered as a whole number`, () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        cy.keyboardInput(field.input(), '5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is correctly entered with a comma`, () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = natureOfBusiness[fieldId];

        cy.keyboardInput(field.input(), '5,000,000');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });
  });
});
