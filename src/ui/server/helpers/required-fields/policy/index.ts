import POLICY_FIELD_IDS, { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy';
import { isSinglePolicyType, isMultiplePolicyType } from '../../policy-type';

const { REQUESTED_START_DATE, CREDIT_PERIOD_WITH_BUYER, POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const { CONTRACT_POLICY, TYPE_OF_POLICY, ABOUT_GOODS_OR_SERVICES } = POLICY_FIELD_IDS;

const {
  SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  MULTIPLE,
} = CONTRACT_POLICY;

/**
 * getContractPolicyTasks
 * Get contract policy tasks depending on the type of policy
 * @param {String} Application policy type
 * @returns {Object} Contract policy tasks
 */
export const getContractPolicyTasks = (policyType?: string): object => {
  if (policyType && isSinglePolicyType(policyType)) {
    return {
      CONTRACT_COMPLETION_DATE,
      TOTAL_CONTRACT_VALUE,
    };
  }

  if (policyType && isMultiplePolicyType(policyType)) {
    return MULTIPLE;
  }

  return TYPE_OF_POLICY;
};

/**
 * Required fields for the insurance - policy section
 * @param {String} Application "Policy type"
 * @returns {Array} Required field IDs
 */
const requiredFields = (policyType?: string) =>
  Object.values({
    ...TYPE_OF_POLICY,
    REQUESTED_START_DATE,
    CREDIT_PERIOD_WITH_BUYER,
    POLICY_CURRENCY_CODE,
    ...getContractPolicyTasks(policyType),
    ...ABOUT_GOODS_OR_SERVICES,
  });

export default requiredFields;
