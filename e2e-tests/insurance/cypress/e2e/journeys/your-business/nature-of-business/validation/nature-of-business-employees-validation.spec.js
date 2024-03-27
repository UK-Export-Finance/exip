import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: {
      EMPLOYEES_UK: FIELD_ID,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_ROOT },
} = INSURANCE_ROUTES;

const field = fieldSelector(FIELD_ID);

const assertions = {
  field,
  errorIndex: 2,
  expectedErrorsCount: 3,
};

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - number of employees input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

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

  describe(`${FIELD_ID} validation`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(`when ${FIELD_ID} is left empty`, () => {
      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe(`when ${FIELD_ID} is a decimal place number`, () => {
      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: '5.5',
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].INCORRECT_FORMAT,
        });
      });
    });

    describe(`when ${FIELD_ID} has special characters`, () => {
      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: '35',
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].INCORRECT_FORMAT,
        });
      });
    });

    describe(`when ${FIELD_ID} is below 0`, () => {
      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: '-5',
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].BELOW_MINIMUM,
        });
      });
    });

    describe(`when ${FIELD_ID} is entered as 0`, () => {
      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: '0',
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].BELOW_MINIMUM,
        });
      });
    });

    describe(`when ${FIELD_ID} is correctly entered as a whole number`, () => {
      it(`should not display  ${FIELD_ID} validation errors`, () => {
        cy.navigateToUrl(url);

        cy.keyboardInput(field.input(), '5');
        cy.clickSubmitButton();
        cy.assertErrorSummaryListLength(2);
      });
    });

    describe(`when ${FIELD_ID} is correctly entered with a comma`, () => {
      it(`should not display  ${FIELD_ID} validation errors`, () => {
        cy.navigateToUrl(url);

        cy.keyboardInput(field.input(), '5,000');
        cy.clickSubmitButton();
        cy.assertErrorSummaryListLength(2);
      });
    });
  });
});
