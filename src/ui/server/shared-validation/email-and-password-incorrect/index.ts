import generateValidationErrors from '../../helpers/validation';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../content-strings';
import { ValidationErrors } from '../../../types';

const { EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  ACCOUNT: { SIGN_IN: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

/**
 * emailAndPasswordIncorrectValidationErrors
 * Return "incorrect" validation errors for both EMAIL and PASSWORD fields.
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const emailAndPasswordIncorrectValidationErrors = (errors: ValidationErrors) => {
  let emailError = errors;

  /**
   * If errors.count is NOT 1,
   * Generate an email validation error.
   * This ensures that a validation error is returned for both EMAIL and PASSWORD,
   * to indicate to a user that the credentials are invalid.
   * Otherwise, the email already has a bespoke error that can be consumed.
   */
  if (errors.count !== 1) {
    emailError = generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT[EMAIL].INCORRECT, {});
  }

  const emailAndPasswordError = generateValidationErrors(PASSWORD, ERROR_MESSAGES_OBJECT[PASSWORD].INCORRECT, emailError);

  return emailAndPasswordError;
};

export default emailAndPasswordIncorrectValidationErrors;
