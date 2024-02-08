import { field } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: {
        [FIELD_ID]: ERROR_MESSAGES_OBJECT,
      },
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Account - Password reset page - form validation', () => {
  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(PASSWORD_RESET_ROOT);
  });

  assertEmailFieldValidation({
    fieldId: FIELD_ID,
    errorIndex: 0,
    errorMessages: ERROR_MESSAGES_OBJECT,
    totalExpectedErrors: 1,
  });

  it('should render a validation error when email is valid, but the account does not exist', () => {
    const inputValue = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

    const ERROR_ASSERTIONS = {
      errorField: field(FIELD_ID),
      expectedErrorsCount: 1,
      errorIndex: 0,
      errorMessage: ERROR_MESSAGES_OBJECT.ACCOUNT_DOES_NOT_EXIST,
    };

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });
});
