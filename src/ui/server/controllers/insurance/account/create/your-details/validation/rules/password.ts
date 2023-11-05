import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import passwordValidation from '../../../../../../../shared-validation/password';
import { RequestBody } from '../../../../../../../../types';

const { PASSWORD: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * passwordRules
 * Check submitted form data for errors with the password field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const passwordRules = (formBody: RequestBody, errors: object) => {
  const fieldValue = formBody[FIELD_ID];

  return passwordValidation(FIELD_ID, fieldValue, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
};

export default passwordRules;
