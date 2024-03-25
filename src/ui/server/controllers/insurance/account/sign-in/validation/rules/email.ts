import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../helpers/object';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password-incorrect';
import isValidEmail from '../../../../../../helpers/is-valid-email';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { RequestBody } from '../../../../../../../types';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * emailRules
 * Execute email validation rules for account sign in:
 * 1) Check if an email is provided. If not, return emailAndPasswordValidation.
 * 2) Check if an email is formatted correctly. if not, return emailAndPasswordValidation.
 * 3) Check if an email is below the minimum length via maxLengthValidation.
 * If all of the conditions are met, empty errors are returned (via maxLengthValidation).
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors} emailAndPasswordValidation | maxLengthValidation
 */
const emailRules = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return emailAndPasswordValidation(errors);
  }

  const emailValue = formBody[FIELD_ID];

  if (!isValidEmail(emailValue)) {
    return emailAndPasswordValidation(errors);
  }

  return maxLengthValidation(emailValue, FIELD_ID, ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM, errors, MAXIMUM_CHARACTERS.EMAIL);
};

export default emailRules;
