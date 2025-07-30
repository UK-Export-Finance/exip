import { FIELD_VALUES } from '../../constants';

/**
 * isSinglePolicyType
 * Check if a policy type is 'Single contract policy'
 * @param {string} Policy type
 * @returns {boolean}
 */
const isSinglePolicyType = (policyType?: string) => policyType === FIELD_VALUES.POLICY_TYPE.SINGLE;

/**
 * isMultiplePolicyType
 * Check if a policy type is 'Multiple contract policy'
 * @param {string} Policy type
 * @returns {boolean}
 */
const isMultiplePolicyType = (policyType?: string) => policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE;

/**
 * isValidPolicyType
 * Check if a policy type is 'Single contract policy' or 'Multiple contract policy'
 * @param {string} Policy type
 * @returns {boolean}
 */
const isValidPolicyType = (policyType: string) => isSinglePolicyType(policyType) || isMultiplePolicyType(policyType);

export { isSinglePolicyType, isMultiplePolicyType, isValidPolicyType };
