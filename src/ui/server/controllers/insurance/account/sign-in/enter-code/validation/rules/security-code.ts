import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const { SECURITY_CODE: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * securityCodeRules
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const securityCodeRules = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.INCORRECT, errors);

export default securityCodeRules;
