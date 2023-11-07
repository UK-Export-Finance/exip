import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password';
import { RequestBody } from '../../../../../../../types';

const { PASSWORD: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * passwordRules
 * Returns emailAndPasswordValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const passwordRules = (formBody: RequestBody, errors: object) => emailAndPasswordValidation(formBody, FIELD_ID, ERROR_MESSAGE.INCORRECT, errors);

export default passwordRules;
