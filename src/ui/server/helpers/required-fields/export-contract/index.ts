import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const {
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
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
}

/**
 * privateCoverTasks
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @returns {String} Private cover task
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
 * Required fields for the insurance - export contract section
 * * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @returns {Array} Required field IDs
 */
const requiredFields = ({ totalContractValueOverThreshold, finalDestinationKnown, attemptedPrivateMarketCover }: RequiredFields): Array<string> => [
  PAYMENT_TERMS_DESCRIPTION,
  ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
  ...privateCoverTasks({ totalContractValueOverThreshold, attemptedPrivateMarketCover }),
];

export default requiredFields;
