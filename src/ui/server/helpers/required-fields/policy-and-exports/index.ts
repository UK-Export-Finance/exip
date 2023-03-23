import { FIELD_IDS, FIELD_VALUES } from '../../../constants';
import { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy-and-exports';

/**
 * getContractPolicyTasks
 * Get contract policy tasks depending on the type of policy
 * @param {String} Application policy type
 * @returns {Object} Contract policy tasks
 */
export const getContractPolicyTasks = (policyType?: string): object => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    return FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE;
  }

  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE) {
    return FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE;
  }

  return FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;
};

/**
 * Required fields for the insurance - policy and exports section 
 * @param {Array} Required field IDs
 */
const requiredFields = (policyType?: string) =>
  Object.values({
    ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
    ...SHARED_CONTRACT_POLICY,
    ...getContractPolicyTasks(policyType),
    ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
  });

export default requiredFields;
