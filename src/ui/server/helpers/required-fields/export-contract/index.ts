import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const {
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
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
}

/**
 * privateCoverTasks
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @returns {Array} Array of tasks
 */
export const privateCoverTasks = ({ totalContractValueOverThreshold, attemptedPrivateMarketCover }: RequiredFields): Array<string> => {
  if (totalContractValueOverThreshold) {
    if (attemptedPrivateMarketCover) {
      return [DECLINED_DESCRIPTION];
    }

    return [ATTEMPTED];
  }

  return [];
};

/**
 * agentTasks
 * @param {Boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @returns {Array} Array of tasks
 */
export const agentTasks = ({ isUsingAgent }: RequiredFields): Array<string> => {
  if (isUsingAgent) {
    return [AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE, IS_CHARGING, SERVICE_DESCRIPTION];
  }

  return [USING_AGENT];
};

/**
 * Required fields for the insurance - export contract section
 * * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {Boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @returns {Array} Required field IDs
 */
const requiredFields = ({
  totalContractValueOverThreshold,
  finalDestinationKnown,
  attemptedPrivateMarketCover,
  isUsingAgent,
}: RequiredFields): Array<string> => [
  PAYMENT_TERMS_DESCRIPTION,
  ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
  ...privateCoverTasks({ totalContractValueOverThreshold, attemptedPrivateMarketCover }),
  ...agentTasks({ isUsingAgent }),
];

export default requiredFields;
