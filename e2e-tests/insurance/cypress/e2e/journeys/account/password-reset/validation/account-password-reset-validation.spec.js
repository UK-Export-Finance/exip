import { field } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { INVALID_EMAILS } from '../../../../../../../constants';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: PASSWORD_RESET_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_ASSERTIONS = {
  errorField: field(EMAIL),
  expectedErrorsCount: 1,
  errorIndex: 0,
  errorMessage: PASSWORD_RESET_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT,
};

const {
  errorField, errorIndex, expectedErrorsCount, errorMessage,
} = ERROR_ASSERTIONS;

context('Insurance - Account - Password reset page - form validation', () => {
  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(PASSWORD_RESET_ROOT);
  });

  it('should render a validation error when email is empty', () => {
    const inputValue = '';

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should render a validation error when email does not contain an @ symbol', () => {
    const inputValue = INVALID_EMAILS.NO_AT_SYMBOL;

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should render a validation error when email does not contain at least one dot', () => {
    const inputValue = INVALID_EMAILS.NO_DOTS;

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should render a validation error when email contains a space', () => {
    const inputValue = INVALID_EMAILS.WITH_SPACE;

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should render a validation error when email does not contain a domain', () => {
    const inputValue = INVALID_EMAILS.NO_DOMAIN;

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should render a validation error when email is valid, but the account does not exist', () => {
    const inputValue = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

    const expectedErrorMessage = PASSWORD_RESET_ERROR_MESSAGES[EMAIL].ACCOUNT_DOES_NOT_EXIST;

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, expectedErrorMessage);
  });
});
