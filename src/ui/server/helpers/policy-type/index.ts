import { FIELD_VALUES } from '../../constants';

/**
 * isSinglePolicyType
 * Check if a policy type is 'Single contract policy'
 * @param {String} Policy type
 * @returns {Boolean}
 */
const isSinglePolicyType = (policyType: string) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    return true;
  }

  return false;
};

/**
 * isMultiPolicyType
 * Check if a policy type is 'Multiple contract policy'
 * @param {String} Policy type
 * @returns {Boolean}
 */
const isMultiPolicyType = (policyType: string) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTI) {
    return true;
  }

  return false;
};

export { isSinglePolicyType, isMultiPolicyType };
