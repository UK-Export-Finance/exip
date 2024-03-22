import Joi from 'joi';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../helpers/object';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password-incorrect';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { RequestBody } from '../../../../../../../types';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

// TODO: update documentation
// TODO: update unit test
/**
 * emailRules
 * Returns emailAndPasswordValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Function} emailAndPasswordValidation
 */
const emailRules = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return emailAndPasswordValidation(errors);
  }

  const emailValue = formBody[FIELD_ID];

  /**
   * Ignore the length in Joi validation,
   * Joi maximum length is handled below, using the MAXIMUM_CHARACTERS.EMAIL definition.
   */
  const schema = Joi.string().email({
    ignoreLength: true,
  });

  const validation = schema.validate(emailValue);

  if (validation.error) {
    return emailAndPasswordValidation(errors);
  }

  return maxLengthValidation(emailValue, FIELD_ID, ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM, errors, MAXIMUM_CHARACTERS.EMAIL);
};

export default emailRules;
