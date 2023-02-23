import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../../types';

const { SECURITY_CODE: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * securityCodeRules
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const securityCodeRules = (formBody: RequestBody, errors: object) => {
  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default securityCodeRules;
