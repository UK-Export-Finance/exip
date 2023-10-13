import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { isValidPolicyType } from '../../../../../helpers/policy-type';
import { RequestBody } from '../../../../../../types';

const { POLICY } = FIELD_IDS.INSURANCE;
const FIELD_ID = POLICY.POLICY_TYPE;

const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.POLICY.TYPE_OF_POLICY[FIELD_ID].IS_EMPTY;

/**
 * validation
 * Check if the policy type is a valid type and not empty
 * @param {Express.Response.body} Express response body
 * @returns {Object} Validation errors
 */
const validation = (formBody: RequestBody) => {
  let errors;

  const value = formBody[FIELD_ID];

  if (!isValidPolicyType(value)) {
    errors = generateValidationErrors(POLICY.SINGLE_POLICY_TYPE, ERROR_MESSAGE);

    return errors;
  }

  return {};
};

export default validation;
