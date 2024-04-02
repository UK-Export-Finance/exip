import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const {
  ABOUT_GOODS_OR_SERVICES,
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

/**
 * privateCoverTasks
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @returns {Array} Array of tasks
 */
export const privateCoverTasks = (attemptedPrivateMarketCover?: boolean) => {
  if (attemptedPrivateMarketCover) {
    return DECLINED_DESCRIPTION;
  }

  return ATTEMPTED;
};

interface RequiredFields {
  finalDestinationKnown?: boolean;
  attemptedPrivateMarketCover?: boolean;
}

/**
 * Required fields for the insurance - export contract section
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @returns {Array} Required field IDs
 */
const requiredFields = ({ finalDestinationKnown, attemptedPrivateMarketCover }: RequiredFields): Array<string> => [
  ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
  privateCoverTasks(attemptedPrivateMarketCover),
];

export default requiredFields;
