import { FIELD_VALUES } from '../../constants/field-values';

/**
 * isSinglePolicyType
 * Check if a policy type is 'Single contract policy'
 * @param {String} Policy type
 * @returns {Boolean}
 */
const isSinglePolicyType = (policyType: string) => policyType === FIELD_VALUES.POLICY_TYPE.SINGLE;

/**
 * isMultiplePolicyType
 * Check if a policy type is 'Multiple contract policy'
 * @param {String} Policy type
 * @returns {Boolean}
 */
const isMultiplePolicyType = (policyType: string) => policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE;

export { isSinglePolicyType, isMultiplePolicyType };
