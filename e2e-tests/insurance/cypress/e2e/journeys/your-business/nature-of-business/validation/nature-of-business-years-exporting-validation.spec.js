import partials from '../../../../../../../partials';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    YEARS_EXPORTING: FIELD_ID,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const field = fieldSelector(FIELD_ID);

const assertions = {
  field,
  expectedErrorsCount: 3,
  errorIndex: 1,
};

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - years exporting input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${FIELD_ID} error`, () => {
    describe(`when ${FIELD_ID} is left empty`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors if ${FIELD_ID} is left empty`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].IS_EMPTY,
        });
      });

      it(`should focus to the ${FIELD_ID} section when clicking the error`, () => {
        cy.clickSubmitButton();

        partials.errorSummaryListItemLinks().eq(1).click();
        field.input().should('have.focus');
      });
    });

    describe(`when ${FIELD_ID} is a decimal place number`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: '5.5',
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].INCORRECT_FORMAT,
        });
      });
    });

    describe(`when ${FIELD_ID} has special characters`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors for ${FIELD_ID}`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: '5!',
          expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].INCORRECT_FORMAT,
        });
      });
    });
  });

  describe(`when ${FIELD_ID} is correctly entered as a whole number`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), '5');
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      cy.assertErrorSummaryListLength(2);
    });
  });

  describe(`when ${FIELD_ID} is correctly entered with a comma`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), '5,00');
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      cy.assertErrorSummaryListLength(2);
    });
  });
});
