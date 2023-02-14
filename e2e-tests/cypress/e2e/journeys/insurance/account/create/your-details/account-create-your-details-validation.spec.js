import accountFormFields from '../../../../../partials/insurance/accountFormFields';
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
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Account - Create - Your details page - empty form validation', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    const expected = `${Cypress.config('baseUrl')}${YOUR_DETAILS}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  const TOTAL_REQUIRED_FIELDS = 4;

  describe('first name', () => {
    it('should render a validation error', () => {
      const field = yourDetailsPage[FIRST_NAME];
      const value = null;
      const fieldIndex = 0;
      const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[FIRST_NAME].IS_EMPTY;

      cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
    });
  });

  describe('last name', () => {
    it('should render a validation error', () => {
      const field = yourDetailsPage[LAST_NAME];
      const value = null;
      const fieldIndex = 1;
      const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[LAST_NAME].IS_EMPTY;

      cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
    });
  });

  describe('email', () => {
    it('should render a validation error', () => {
      const field = accountFormFields[EMAIL];
      const value = null;
      const fieldIndex = 2;
      const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT;

      cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
    });
  });

  describe('password', () => {
    it('should render a validation error', () => {
      const field = accountFormFields[PASSWORD];
      const value = null;
      const fieldIndex = 3;
      const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT;

      cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
    });
  });
});
