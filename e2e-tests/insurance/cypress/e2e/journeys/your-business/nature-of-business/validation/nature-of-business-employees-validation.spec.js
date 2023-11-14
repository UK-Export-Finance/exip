import partials from '../../../../../../../partials';
import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: {
      EMPLOYEES_UK,
      EMPLOYEES_INTERNATIONAL,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - number of employees input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      cy.completeAndSubmitCompanyDetails({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${EMPLOYEES_UK} validation`, () => {
    // for error assertion - common fields
    const ERROR_ASSERTIONS = {
      expectedErrorsCount: 4,
      errorIndex: 2,
    };

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(`when ${EMPLOYEES_UK} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].IS_EMPTY;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_UK} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '5.5';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_UK} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_UK].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_UK}`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '3S';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered as 0`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

        cy.keyboardInput(field.input(), '0');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered as a whole number`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

        cy.keyboardInput(field.input(), '5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_UK} is correctly entered with a comma`, () => {
      it(`should not display  ${EMPLOYEES_UK} validation errors`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

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

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].IS_EMPTY;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = fieldSelector(fieldId);

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = fieldSelector(fieldId);

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '5.5';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].INCORRECT_FORMAT;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = fieldSelector(fieldId);

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '3S';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is 0`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].BELOW_MINIMUM;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = fieldSelector(fieldId);

        field.input().clear();

        const { expectedErrorsCount, errorIndex } = ERROR_ASSERTIONS;
        const value = '0';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is below the value of ${EMPLOYEES_UK}`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[EMPLOYEES_INTERNATIONAL].BELOW_UK;

      it(`should display validation errors for ${EMPLOYEES_INTERNATIONAL}`, () => {
        const internationalField = fieldSelector(EMPLOYEES_INTERNATIONAL);
        const ukField = fieldSelector(EMPLOYEES_UK);

        cy.keyboardInput(ukField.input(), '20');

        const value = '10';

        cy.submitAndAssertFieldErrors(internationalField, value, 2, 3, errorMessage);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is correctly entered as a whole number`, () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = fieldSelector(fieldId);

        cy.keyboardInput(field.input(), '5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });

    describe(`when ${EMPLOYEES_INTERNATIONAL} is correctly entered with a comma`, () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        const fieldId = EMPLOYEES_INTERNATIONAL;
        const field = fieldSelector(fieldId);

        cy.keyboardInput(field.input(), '5,000,000');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 3);
      });
    });
  });
});
