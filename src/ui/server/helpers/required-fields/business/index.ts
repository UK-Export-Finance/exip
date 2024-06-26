import FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE, YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, BROKER },
} = FIELD_IDS;

const {
  SEARCH,
  COMPANY_ADDRESS,
  REGISTED_OFFICE_ADDRESS,
  COMPANY_SIC,
  COMPANY_INCORPORATED,
  FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
  INDUSTRY_SECTOR_NAMES,
  SIC_CODE,
  OLD_SIC_CODES,
  INDUSTRY_SECTOR_NAME,
  ...COMPANIES_HOUSE_FIELDS
} = COMPANY_HOUSE;

const { ADDRESS, PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = YOUR_COMPANY;

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
 * Required fields for the insurance - business section
 * @param {Boolean} Is using broker
 * @returns {Array} Required field IDs
 */
const requiredFields = (isUsingBroker?: boolean): Array<string> => {
  let fields = {
    ...YOUR_COMPANY_FIELDS,
    ...COMPANIES_HOUSE_FIELDS,
    ...NATURE_OF_YOUR_BUSINESS,
    ...TURNOVER_FIELDS,
    USING_BROKER,
  };

  if (isUsingBroker) {
    fields = {
      ...fields,
      ...getBrokerTasks(isUsingBroker),
    };
  }

  return Object.values(fields);
};

export default requiredFields;
