import { EXPORT_CONTRACT_AWARD_METHOD, FIELD_VALUES } from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const {
  EXPORT_CONTRACT: { AGENT_SERVICE_CHARGE_METHOD },
} = FIELD_VALUES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE },
} = FIELD_IDS;

/**
 * getAboutGoodsOrServicesTasks
 * @param {boolean} finalDestinationKnown: "Final destination known"
 * @returns {Array<string>} Array of tasks/field IDs
 */
export const getAboutGoodsOrServicesTasks = (finalDestinationKnown?: boolean) => {
  if (finalDestinationKnown) {
    return Object.values(ABOUT_GOODS_OR_SERVICES);
  }

  return [ABOUT_GOODS_OR_SERVICES.DESCRIPTION, ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION_KNOWN];
};

interface RequiredFields {
  totalContractValueOverThreshold?: boolean;
  finalDestinationKnown?: boolean;
  attemptedPrivateMarketCover?: boolean;
  isUsingAgent?: boolean;
  agentIsCharging?: boolean;
  agentChargeMethod?: string;
  awardMethodId?: string;
}

/**
 * privateCoverTasks
 * @param {boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @returns {string[]} Array of tasks/field IDs
 */
export const privateCoverTasks = ({ totalContractValueOverThreshold, attemptedPrivateMarketCover }: RequiredFields): string[] => {
  if (totalContractValueOverThreshold) {
    if (attemptedPrivateMarketCover) {
      return [DECLINED_DESCRIPTION];
    }

    return [ATTEMPTED];
  }

  return [];
};

/**
 * agentServiceChargeTasks
 * @param {boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {boolean} agentChargeMethod: Agent charge method
 * @returns {string[]} Array of tasks/field IDs
 */
export const agentServiceChargeTasks = ({ agentIsCharging, agentChargeMethod }: RequiredFields): string[] => {
  if (agentIsCharging) {
    const tasks: string[] = [METHOD, PAYABLE_COUNTRY_CODE];

    if (agentChargeMethod === AGENT_SERVICE_CHARGE_METHOD.FIXED_SUM) {
      tasks.push(FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE);
    }

    if (agentChargeMethod === AGENT_SERVICE_CHARGE_METHOD.PERCENTAGE) {
      tasks.push(PERCENTAGE_CHARGE);
    }

    return tasks;
  }

  return [];
};

/**
 * agentTasks
 * @param {boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @param {boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {boolean} agentChargeMethod: Agent charge method
 * @returns {Array<string>} Array of tasks/field IDs
 */
export const agentTasks = ({ isUsingAgent, agentIsCharging, agentChargeMethod }: RequiredFields): Array<string> => {
  if (isUsingAgent) {
    const tasks = [
      AGENT_NAME,
      AGENT_FULL_ADDRESS,
      AGENT_COUNTRY_CODE,
      IS_CHARGING,
      SERVICE_DESCRIPTION,
      ...agentServiceChargeTasks({ agentIsCharging, agentChargeMethod }),
    ];

    return tasks;
  }

  return [USING_AGENT];
};

/**
 * awardMethodTasks
 * @param {string} awardMethodId: Export contract award method ID
 * @returns {Array<string>} Array of tasks/field IDs
 */
export const awardMethodTasks = (awardMethodId?: string): Array<string> => {
  if (awardMethodId === EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID) {
    return [AWARD_METHOD, OTHER_AWARD_METHOD];
  }

  return [AWARD_METHOD];
};

/**
 * Required fields for the insurance - export contract section
 * @param {boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {boolean} finalDestinationKnown: "Final destination known"
 * @param {boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @param {boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {boolean} agentChargeMethod: Agent charge method
 * @param {string} awardMethodId: Export contract award method ID
 * @param {boolean} agentChargeMethod: Agent charge method
 * @returns {Array} Required field IDs
 */
const requiredFields = ({
  totalContractValueOverThreshold,
  finalDestinationKnown,
  attemptedPrivateMarketCover,
  isUsingAgent,
  agentIsCharging,
  agentChargeMethod,
  awardMethodId,
}: RequiredFields): Array<string> => [
  PAYMENT_TERMS_DESCRIPTION,
  ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
  ...privateCoverTasks({ totalContractValueOverThreshold, attemptedPrivateMarketCover }),
  ...agentTasks({ isUsingAgent, agentIsCharging, agentChargeMethod }),
  ...awardMethodTasks(awardMethodId),
];

export default requiredFields;
