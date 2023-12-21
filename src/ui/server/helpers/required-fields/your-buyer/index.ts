import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const YOUR_BUYER_FIELD_IDS = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = YOUR_BUYER_FIELD_IDS.COMPANY_OR_ORGANISATION;
const { CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER } = YOUR_BUYER_FIELD_IDS.WORKING_WITH_BUYER;
/**
 * getYourCompanyTasks
 * Get your company tasks depending on the hasDifferentTradingName field
 * @param {Boolean} hasDifferentTradingName "has different trading name" flag
 * @returns {Array} Array of tasks
 */
export const workingWithBuyerTasks = (connectedWithBuyer?: boolean): Array<string> => {
  if (connectedWithBuyer) {
    return [CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];
  }

  return [CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];
};

/**
 * Required fields for the insurance - your buyer section
 * @returns {Array} Required field IDs
 */
const requiredFields = (connectedWithBuyer?: boolean): Array<string> =>
  Object.values({
    ...COMPANY_OR_ORGANISATION_FIELDS,
    ...workingWithBuyerTasks(connectedWithBuyer),
  }) as Array<string>;

export default requiredFields;
