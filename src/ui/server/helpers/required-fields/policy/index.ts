import POLICY_FIELD_IDS, { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { isSinglePolicyType, isMultiplePolicyType } from '../../policy-type';

const { REQUESTED_START_DATE, POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const {
  BROKER_DETAILS: { NAME, BROKER_EMAIL, FULL_ADDRESS },
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
  NAME_ON_POLICY,
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COUNTRY_CODE },
  TYPE_OF_POLICY,
  USING_BROKER,
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { LOSS_PAYEE_NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK },
  LOSS_PAYEE_FINANCIAL_ADDRESS,
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
} = POLICY_FIELD_IDS;

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
    return {
      TOTAL_MONTHS_OF_COVER,
      TOTAL_SALES_TO_BUYER,
      MAXIMUM_BUYER_WILL_OWE,
    };
  }

  return TYPE_OF_POLICY;
};

/**
 * getJointlyInsuredPartyTasks
 * Get "Jointly insured party" tasks depending on the jointlyInsuredParty field.
 * @param {Boolean} jointlyInsuredParty: "Jointly insured party" flag
 * @returns {Array} Array of tasks
 */
export const getJointlyInsuredPartyTasks = (jointlyInsuredParty?: boolean) => {
  if (jointlyInsuredParty) {
    return [COMPANY_NAME, COUNTRY_CODE];
  }

  return [REQUESTED];
};

/**
 * getBrokerTasks
 * Get "Broker" tasks depending on the isUsingBroker field
 * @param {Boolean} isUsingBroker: "Is using broker" flag
 * @returns {Array} Array of tasks
 */
export const getBrokerTasks = (isUsingBroker?: boolean) => {
  if (isUsingBroker) {
    return [NAME, BROKER_EMAIL, FULL_ADDRESS];
  }

  return [];
};

/**
 * lossPayeeTasks
 * Get "Loss payee" section tasks depending on the isUsingBroker field
 * @param {Boolean} isAppointingLossPayee: "Is using loss payee" flag
 * @param {Boolean} lossPayeeIsLocatedInUk: "Loss payee is located in the UK" flag
 * @returns {Array} Array of tasks
 */
export const lossPayeeTasks = (isAppointingLossPayee?: boolean, lossPayeeIsLocatedInUk?: boolean) => {
  if (isAppointingLossPayee) {
    if (lossPayeeIsLocatedInUk) {
      return [LOSS_PAYEE_NAME, SORT_CODE, ACCOUNT_NUMBER, LOSS_PAYEE_FINANCIAL_ADDRESS];
    }

    return [LOSS_PAYEE_NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK];
  }

  return [IS_APPOINTED];
};

interface RequiredFields {
  policyType?: string;
  jointlyInsuredParty?: boolean;
  isUsingBroker?: boolean;
  isAppointingLossPayee?: boolean;
  lossPayeeIsLocatedInUk?: boolean;
}

/**
 * Required fields for the insurance - policy section
 * @param {String} policyType: Application "Policy type"
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @param {Boolean} jointlyInsuredParty: "Jointly insured party" flag
 * @param {Boolean} isUsingBroker: "Is using broker"
 * @returns {Array} Required field IDs
 */
const requiredFields = ({ policyType, jointlyInsuredParty, isUsingBroker, isAppointingLossPayee, lossPayeeIsLocatedInUk }: RequiredFields): Array<string> => [
  ...Object.values(TYPE_OF_POLICY),
  REQUESTED_START_DATE,
  POLICY_CURRENCY_CODE,
  ...Object.values(getContractPolicyTasks(policyType)),
  ...Object.values(getJointlyInsuredPartyTasks(jointlyInsuredParty)),
  IS_SAME_AS_OWNER,
  FIRST_NAME,
  LAST_NAME,
  POLICY_CONTACT_EMAIL,
  POSITION,
  USING_BROKER,
  ...getBrokerTasks(isUsingBroker),
  ...lossPayeeTasks(isAppointingLossPayee, lossPayeeIsLocatedInUk),
];

export default requiredFields;
