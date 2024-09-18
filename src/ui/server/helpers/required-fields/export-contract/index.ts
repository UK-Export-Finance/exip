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
  AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE },
} = FIELD_IDS;

/**
 * getAboutGoodsOrServicesTasks
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @returns {Array} Array of tasks
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
  migratedV1toV2?: boolean;
}

/**
 * privateCoverTasks
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @returns {Array} Array of tasks
 */
export const privateCoverTasks = ({ totalContractValueOverThreshold, attemptedPrivateMarketCover, migratedV1toV2 }: RequiredFields): Array<string> => {
  if (totalContractValueOverThreshold || migratedV1toV2) {
    if (attemptedPrivateMarketCover) {
      return [DECLINED_DESCRIPTION];
    }

    return [ATTEMPTED];
  }

  return [];
};

/**
 * agentServiceChargeTasks
 * @param {Boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {Boolean} agentChargeMethod: Agent charge method
 * @returns {Array} Array of tasks
 */
export const agentServiceChargeTasks = ({ agentIsCharging, agentChargeMethod }: RequiredFields): Array<string> => {
  if (agentIsCharging) {
    const tasks = [METHOD, PAYABLE_COUNTRY_CODE];

    // TODO: EMS-3828 - renable
    // if (agentChargeMethod === AGENT_SERVICE_CHARGE_METHOD.FIXED_SUM) {
    //   tasks.push(FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE);
    // }

    if (agentChargeMethod === AGENT_SERVICE_CHARGE_METHOD.PERCENTAGE) {
      tasks.push(PERCENTAGE_CHARGE);
    }

    return tasks;
  }

  return [];
};

/**
 * agentTasks
 * @param {Boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @param {Boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {Boolean} agentChargeMethod: Agent charge method
 * @returns {Array} Array of tasks
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
 * @param {String} awardMethodId: Export contract award method ID
 * @returns {Array} Array of tasks
 */
export const awardMethodTasks = (awardMethodId?: string): Array<string> => {
  if (awardMethodId === EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID) {
    return [AWARD_METHOD, OTHER_AWARD_METHOD];
  }

  return [AWARD_METHOD];
};

/**
 * Required fields for the insurance - export contract section
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {Boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @param {Boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {Boolean} agentChargeMethod: Agent charge method
 * @param {String} awardMethodId: Export contract award method ID
 * @param {Boolean} agentChargeMethod: Agent charge method
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
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
  migratedV1toV2,
}: RequiredFields): Array<string> => [
  PAYMENT_TERMS_DESCRIPTION,
  ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
  ...privateCoverTasks({ totalContractValueOverThreshold, attemptedPrivateMarketCover, migratedV1toV2 }),
  ...agentTasks({ isUsingAgent, agentIsCharging, agentChargeMethod }),
  ...awardMethodTasks(awardMethodId),
];

export default requiredFields;
