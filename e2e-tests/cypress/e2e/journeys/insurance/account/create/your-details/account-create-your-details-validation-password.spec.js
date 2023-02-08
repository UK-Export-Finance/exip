import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
} = ROUTES;

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT;

const submitAndAssertFieldErrors = (fieldValue) => {
  const field = accountFormFields[PASSWORD];

  field.input().clear().type(fieldValue, { delay: 0 });
  submitButton().click();

  cy.checkText(
    partials.errorSummaryListItems().eq(3),
    expectedMessage,
  );

  cy.checkText(field.errorMessage(), `Error: ${expectedMessage}`);
};

context('Insurance - Account - Create - Your details page - form validation - password', () => {
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

  describe('when password does not have the minimum amount of characters', () => {
    it('should render a validation error', () => {
      const invalidPassword = 'Mock1!';

      submitAndAssertFieldErrors(invalidPassword);
    });
  });

  describe('when password does not contain an uppercase letter', () => {
    it('should render a validation error', () => {
      const invalidPassword = 'mockpassword1!';

      submitAndAssertFieldErrors(invalidPassword);
    });
  });

  describe('when password does not contain a lowercase letter', () => {
    it('should render a validation error', () => {
      const invalidPassword = 'MOCKPASSWORD1!';

      submitAndAssertFieldErrors(invalidPassword);
    });
  });

  describe('when password does not contain a number', () => {
    it('should render a validation error', () => {
      const invalidPassword = 'Mockpassword!';

      submitAndAssertFieldErrors(invalidPassword);
    });
  });

  describe('when password does not contain a special character', () => {
    it('should render a validation error', () => {
      const invalidPassword = 'Mockpassword1';

      submitAndAssertFieldErrors(invalidPassword);
    });
  });
});
