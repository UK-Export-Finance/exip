import accountFormFields from '../../../../../../partials/insurance/accountFormFields';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { INVALID_PASSWORDS } from '../../../../../../../../constants/examples';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../../constants/routes/insurance';
import api from '../../../../../../../support/api';

const {
  ACCOUNT: {
    PASSWORD_RESET: {
      ROOT: PASSWORD_RESET_ROOT,
      LINK_SENT,
      NEW_PASSWORD,
    },
  },
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

const fieldErrorAssertions = (value) => ({
  field: accountFormFields[PASSWORD],
  value,
  fieldIndex: 0,
  errorSummaryLength: 1,
  errorMessage: YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT,
});

context('Insurance - Account - Password reset - new password page - form validation - password', () => {
  let url;
  let resetPasswordToken;

  before(() => {
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // navigate to password reset page
    cy.navigateToUrl(PASSWORD_RESET_ROOT);

    cy.completeAndSubmitPasswordResetForm({});

    url = `${Cypress.config('baseUrl')}${LINK_SENT}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when visiting ${NEW_PASSWORD} with a token query param`, () => {
    before(async () => {
      // Get an account's password reset token
      resetPasswordToken = await api.getAccountPasswordResetToken();

      url = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('form validation', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.url().should('eq', url);
      });

      it('should render a validation error when password does not have the minimum amount of characters', () => {
        const submittedValue = INVALID_PASSWORDS.NOT_MINIMUM_CHARACTERS;

        const {
          field,
          value,
          fieldIndex,
          errorSummaryLength,
          errorMessage,
        } = fieldErrorAssertions(submittedValue);

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
      });

      it('should render a validation error when password does not contain an uppercase letter', () => {
        const submittedValue = INVALID_PASSWORDS.NO_UPPERCASE_LETTER;

        const {
          field,
          value,
          fieldIndex,
          errorSummaryLength,
          errorMessage,
        } = fieldErrorAssertions(submittedValue);

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
      });

      it('should render a validation error when password does not contain a lowercase letter', () => {
        const submittedValue = INVALID_PASSWORDS.NO_LOWERCASE_LETTER;

        const {
          field,
          value,
          fieldIndex,
          errorSummaryLength,
          errorMessage,
        } = fieldErrorAssertions(submittedValue);

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
      });

      it('should render a validation error when password does not contain a number', () => {
        const submittedValue = INVALID_PASSWORDS.NO_NUMBER;

        const {
          field,
          value,
          fieldIndex,
          errorSummaryLength,
          errorMessage,
        } = fieldErrorAssertions(submittedValue);

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
      });

      it('should render a validation error when password does not contain a special character', () => {
        const submittedValue = INVALID_PASSWORDS.NO_SPECIAL_CHARACTER;

        const {
          field,
          value,
          fieldIndex,
          errorSummaryLength,
          errorMessage,
        } = fieldErrorAssertions(submittedValue);

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
      });
    });
  });
});
