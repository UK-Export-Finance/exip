import partials from '../../../../../../../partials';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    YEARS_EXPORTING,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const fieldId = YEARS_EXPORTING;
const field = fieldSelector(fieldId);

const expectedErrorsCount = 3;

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

  describe(`${YEARS_EXPORTING} error`, () => {
    describe(`when ${YEARS_EXPORTING} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[YEARS_EXPORTING].IS_EMPTY;

      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors if ${YEARS_EXPORTING} is left empty`, () => {
        cy.submitAndAssertFieldErrors(
          field,
          null,
          1,
          expectedErrorsCount,
          errorMessage,
          true,
        );
      });

      it(`should focus to the ${YEARS_EXPORTING} section when clicking the error`, () => {
        cy.clickSubmitButton();

        partials.errorSummaryListItemLinks().eq(1).click();
        field.input().should('have.focus');
      });
    });

    describe(`when ${YEARS_EXPORTING} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[YEARS_EXPORTING].INCORRECT_FORMAT;

      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors for ${YEARS_EXPORTING}`, () => {
        const submittedValue = '5.5';

        cy.submitAndAssertFieldErrors(
          field,
          submittedValue,
          1,
          expectedErrorsCount,
          errorMessage,
          true,
        );
      });
    });

    describe(`when ${YEARS_EXPORTING} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[YEARS_EXPORTING].INCORRECT_FORMAT;

      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors for ${YEARS_EXPORTING}`, () => {
        const submittedValue = '5!';

        cy.submitAndAssertFieldErrors(
          field,
          submittedValue,
          1,
          expectedErrorsCount,
          errorMessage,
          true,
        );
      });
    });
  });

  describe(`when ${YEARS_EXPORTING} is correctly entered as a whole number`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), '5');
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 2);
    });
  });

  describe(`when ${YEARS_EXPORTING} is correctly entered with a comma`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), '5,00');
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 2);
    });
  });
});
