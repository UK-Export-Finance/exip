import { FIELD_IDS } from '../../../constants';

/**
 * getBrokerTasks
 * returns tasks required for broker section based on isUsingBroker field
 * @param {String} isUsingBroker
 * @returns {Array} Array of tasks
 */
export const getBrokerTasks = (isUsingBroker?: string): Array<string> => {
  const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER;

  if (isUsingBroker && isUsingBroker === 'Yes') {
    return [USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];
  }

  return [USING_BROKER];
};

const {
  COMPANY_ADDRESS,
  SEARCH,
  INPUT,
  REGISTED_OFFICE_ADDRESS,
  COMPANY_SIC,
  COMPANY_INCORPORATED,
  FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
  ...COMPANIES_HOUSE_FIELDS
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE;
const { PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY;
const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

const requiredFields = (isUsingBroker?: string): Array<string> =>
  Object.values({
    ...YOUR_COMPANY_FIELDS,
    ...COMPANIES_HOUSE_FIELDS,
    ...FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS,
    ...TURNOVER_FIELDS,
    ...getBrokerTasks(isUsingBroker),
  });

export default requiredFields;
