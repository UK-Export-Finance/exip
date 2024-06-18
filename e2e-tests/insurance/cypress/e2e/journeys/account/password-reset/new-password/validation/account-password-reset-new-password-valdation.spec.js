import passwordField from '../../../../../../../../partials/insurance/passwordField';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { INVALID_PASSWORDS } from '../../../../../../../../constants/examples';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../../constants/routes/insurance';
import api from '../../../../../../../../commands/api';
import mockAccount from '../../../../../../../../fixtures/account';

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
      PASSWORD_RESET: {
        [PASSWORD]: { CANNOT_USE_PREVIOUS_PASSWORD },
      },
    },
  },
} = ERROR_MESSAGES;

const assertions = (value) => ({
  field: passwordField,
  value,
  expectedErrorsCount: 1,
  expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Password reset - new password page - form validation - password', () => {
  let url;
  let resetPasswordToken;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // navigate to password reset page
    cy.navigateToUrl(PASSWORD_RESET_ROOT);

    cy.completeAndSubmitPasswordResetForm({});

    url = `${baseUrl}${LINK_SENT}`;

    cy.assertUrl(url);
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

      url = `${baseUrl}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('form validation', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.assertUrl(url);
      });

      it('should render a validation error when password does not have the minimum amount of characters', () => {
        const submittedValue = INVALID_PASSWORDS.NOT_MINIMUM_CHARACTERS;

        cy.submitAndAssertFieldErrors(assertions(submittedValue));
      });

      it('should render a validation error when password does not contain an uppercase letter', () => {
        const submittedValue = INVALID_PASSWORDS.NO_UPPERCASE_LETTER;

        cy.submitAndAssertFieldErrors(assertions(submittedValue));
      });

      it('should render a validation error when password does not contain a lowercase letter', () => {
        const submittedValue = INVALID_PASSWORDS.NO_LOWERCASE_LETTER;

        cy.submitAndAssertFieldErrors(assertions(submittedValue));
      });

      it('should render a validation error when password does not contain a number', () => {
        const submittedValue = INVALID_PASSWORDS.NO_NUMBER;

        cy.submitAndAssertFieldErrors(assertions(submittedValue));
      });

      it('should render a validation error when password does not contain a special character', () => {
        const submittedValue = INVALID_PASSWORDS.NO_SPECIAL_CHARACTER;

        cy.submitAndAssertFieldErrors(assertions(submittedValue));
      });

      it('should render a validation error when password has been used before', () => {
        const submittedValue = mockAccount[PASSWORD];

        cy.submitAndAssertFieldErrors({ ...assertions(submittedValue), expectedErrorMessage: CANNOT_USE_PREVIOUS_PASSWORD });
      });
    });
  });
});
