import FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: { YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, BROKER },
} = FIELD_IDS;

const { TRADING_NAME, ALTERNATIVE_TRADING_NAME, TRADING_ADDRESS } = YOUR_COMPANY;

const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = TURNOVER;

const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = BROKER;

/**
 * getBrokerTasks
 * Get broker section tasks depending on the isUsingBroker field
 * @param {Boolean} Application "Is using broker" flag
 * @returns {Array} Array of tasks
 */
export const getBrokerTasks = (isUsingBroker?: boolean): Array<string> => {
  if (isUsingBroker) {
    return [NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];
  }

  return [];
};

/**
 * getYourCompanyTasks
 * Get your company tasks depending on the hasDifferentTradingName field
 * @param {Boolean} hasDifferentTradingName "has different trading name" flag
 * @returns {Array} Array of tasks
 */
export const getYourCompanyTasks = (hasDifferentTradingName?: boolean): Array<string> => {
  if (hasDifferentTradingName) {
    return [TRADING_NAME, ALTERNATIVE_TRADING_NAME, TRADING_ADDRESS];
  }

  return [TRADING_NAME, TRADING_ADDRESS];
};

/**
 * Required fields for the insurance - business section
 * @param {Boolean} Is using broker
 * @param {Boolean} hasDifferentTradingName flag
 * @returns {Array} Required field IDs
 */
const requiredFields = (isUsingBroker?: boolean, hasDifferentTradingName?: boolean): Array<string> => {
  let fields = {
    ...getYourCompanyTasks(hasDifferentTradingName),
    ...NATURE_OF_YOUR_BUSINESS,
    ...TURNOVER_FIELDS,
    USING_BROKER,
  } as Array<string>;

  if (isUsingBroker) {
    fields = {
      ...fields,
      ...getBrokerTasks(isUsingBroker),
    };
  }

  return Object.values(fields);
};

export default requiredFields;
