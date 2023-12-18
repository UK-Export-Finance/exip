import EXPORT_CONTRACT_FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';

const { ABOUT_GOODS_OR_SERVICES } = EXPORT_CONTRACT_FIELD_IDS;

/**
 * getAboutGoodsOrServicesTasks
 * @param {Boolean} finalDestinationKnown: Application "Final destination known"
 * @returns {Array} Array of tasks
 */
export const getAboutGoodsOrServicesTasks = (finalDestinationKnown?: boolean) => {
  if (finalDestinationKnown) {
    return Object.values(ABOUT_GOODS_OR_SERVICES);
  }

  return [ABOUT_GOODS_OR_SERVICES.DESCRIPTION, ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION_KNOWN];
};

interface RequiredFields {
  finalDestinationKnown?: boolean;
}

/**
 * Required fields for the insurance - export contract section
 * @param {Boolean} finalDestinationKnown: Application "Final destination known"
 * @returns {Array} Required field IDs
 */
const requiredFields = ({ finalDestinationKnown }: RequiredFields): Array<string> => getAboutGoodsOrServicesTasks(finalDestinationKnown);

export default requiredFields;
