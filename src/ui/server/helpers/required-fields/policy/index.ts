import POLICY_FIELD_IDS, { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { isSinglePolicyType, isMultiplePolicyType } from '../../policy-type';

const { REQUESTED_START_DATE, POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const {
  CONTRACT_POLICY,
  TYPE_OF_POLICY,
  NAME_ON_POLICY,
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL },
} = POLICY_FIELD_IDS;

const {
  SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  MULTIPLE,
} = CONTRACT_POLICY;

const { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL } = NAME_ON_POLICY;

const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

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
 * getBrokerTasks
 * Get broker section tasks depending on the isUsingBroker field
 * @param {Boolean} isUsingBroker: Application "Is using broker" flag
 * @returns {Array} Array of tasks
 */
export const getBrokerTasks = (isUsingBroker?: boolean) => {
  if (isUsingBroker) {
    return [NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];
  }

  return [];
};

interface RequiredFields {
  policyType?: string;
  isUsingBroker?: boolean;
}

/**
 * Required fields for the insurance - policy section
 * @param {String} policyType: Application "Policy type"
 * @param {Boolean} finalDestinationKnown: Application "Final destination known"
 * @param {Boolean} isUsingBroker: Application "Is using broker"
 * @returns {Array} Required field IDs
 */
const requiredFields = ({ policyType, isUsingBroker }: RequiredFields): Array<string> => [
  ...Object.values(TYPE_OF_POLICY),
  REQUESTED_START_DATE,
  POLICY_CURRENCY_CODE,
  ...Object.values(getContractPolicyTasks(policyType)),
  IS_SAME_AS_OWNER,
  FIRST_NAME,
  LAST_NAME,
  POLICY_CONTACT_EMAIL,
  POSITION,
  USING_BROKER,
  ...getBrokerTasks(isUsingBroker),
];

export default requiredFields;
