import FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: { YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, HAS_CREDIT_CONTROL },
} = FIELD_IDS;

const { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS } = YOUR_COMPANY;

const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = TURNOVER;

/**
 * getYourCompanyTasks
 * Get your company tasks depending on the hasDifferentTradingName field
 * @param {Boolean} hasDifferentTradingName "has different trading name" flag
 * @returns {Array} Array of tasks
 */
export const getYourCompanyTasks = (hasDifferentTradingName?: boolean): Array<string> => {
  if (hasDifferentTradingName) {
    return [HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS];
  }

  return [HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS];
};

/**
 * Required fields for the insurance - business section
 * @param {Boolean} Is using broker
 * @param {Boolean} hasDifferentTradingName flag
 * @returns {Array} Required field IDs
 */
const requiredFields = (hasDifferentTradingName?: boolean): Array<string> =>
  Object.values({
    ...getYourCompanyTasks(hasDifferentTradingName),
    ...NATURE_OF_YOUR_BUSINESS,
    ...TURNOVER_FIELDS,
    HAS_CREDIT_CONTROL,
  }) as Array<string>;

export default requiredFields;
