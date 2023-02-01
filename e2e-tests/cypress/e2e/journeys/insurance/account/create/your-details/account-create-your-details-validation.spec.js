import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
} = ROUTES;

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Account - Create - Your details page - form validation', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    const expected = `${Cypress.config('baseUrl')}${YOUR_DETAILS}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      submitButton().click();
    });

    it('sHould render validation errors for all required fields', () => {
      const TOTAL_REQUIRED_FIELDS = 4;

      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      describe('first name', () => {
        const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[FIRST_NAME].IS_EMPTY;
        const inlineError = yourDetailsPage[FIRST_NAME].errorMessage();

        cy.checkText(
          partials.errorSummaryListItems().eq(0),
          expectedMessage,
        );

        cy.checkText(inlineError, `Error: ${expectedMessage}`);
      });

      describe('last name', () => {
        const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[LAST_NAME].IS_EMPTY;
        const inlineError = yourDetailsPage[LAST_NAME].errorMessage();

        cy.checkText(
          partials.errorSummaryListItems().eq(1),
          expectedMessage,
        );

        cy.checkText(inlineError, `Error: ${expectedMessage}`);
      });

      describe('email', () => {
        const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT;
        const inlineError = yourDetailsPage[EMAIL].errorMessage();

        cy.checkText(
          partials.errorSummaryListItems().eq(2),
          expectedMessage,
        );

        cy.checkText(inlineError, `Error: ${expectedMessage}`);
      });
    });

    it('should focus on input when clicking summary error message', () => {
      partials.errorSummaryListItemLinks().eq(0).click();
      yourDetailsPage[FIRST_NAME].input().should('have.focus');

      partials.errorSummaryListItemLinks().eq(1).click();
      yourDetailsPage[LAST_NAME].input().should('have.focus');

      partials.errorSummaryListItemLinks().eq(2).click();
      yourDetailsPage[EMAIL].input().should('have.focus');
    });
  });
});
