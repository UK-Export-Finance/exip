import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../types';

const { POLICY_TYPE: FIELD_ID } = FIELD_IDS;
const ERROR_MESSAGE = ERROR_MESSAGES[FIELD_ID];

/**
 * policyTypeRules
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const policyTypeRules = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE, errors);

export default policyTypeRules;
