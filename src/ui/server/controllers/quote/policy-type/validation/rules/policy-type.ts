import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { isValidPolicyType } from '../../../../../helpers/policy-type';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../types';

const { POLICY_TYPE: FIELD_ID, SINGLE_POLICY_TYPE } = FIELD_IDS;
const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

/**
 * policyTypeRules
 * Check if the policy type is a valid type and not empty
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const policyTypeRules = (formBody: RequestBody, errors: object) => {
  const value = formBody[FIELD_ID];

  if (!isValidPolicyType(value)) {
    return emptyFieldValidation({}, SINGLE_POLICY_TYPE, ERROR_MESSAGE, errors);
  }

  return emptyFieldValidation(formBody, SINGLE_POLICY_TYPE, ERROR_MESSAGE, errors);
};

export default policyTypeRules;
