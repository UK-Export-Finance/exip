import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { FIELDS as YOUR_BUSINESS_FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { GBP_CURRENCY_CODE } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import mapExporterAddress from './map-address';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapYesNoField from '../helpers/map-yes-no-field';
import NEW_LINE from '../helpers/xlsx-new-line';
import { Application, ApplicationCompanySicCode } from '../../../types';

const { FIELDS, SECTION_TITLES } = XLSX;

const CONTENT_STRINGS = {
  ...YOUR_BUSINESS_FIELDS.COMPANY_DETAILS,
  ...YOUR_BUSINESS_FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...YOUR_BUSINESS_FIELDS.TURNOVER,
  ...YOUR_BUSINESS_FIELDS.BROKER,
};

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, PHONE_NUMBER, TRADING_ADDRESS, WEBSITE },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    ALTERNATIVE_TRADING_ADDRESS,
    HAS_CREDIT_CONTROL,
  },
  POLICY: {
    USING_BROKER,
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL, FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapSicCodes
 * Map an application's array of company SIC codes into a single string
 * @param {Array} Application company SIC codes
 * @returns {String} String of company SIC codes for XLSX generation
 */
export const mapSicCodes = (sicCodes: Array<ApplicationCompanySicCode>) => {
  let mapped = '';

  sicCodes.forEach((sicCodeObj) => {
    const { sicCode, industrySectorName } = sicCodeObj;

    mapped += `${sicCode} - ${industrySectorName}${NEW_LINE}`;
  });

  return mapped;
};

/**
 * mapBroker
 * Map an application's broker fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
export const mapBroker = (application: Application) => {
  const { broker } = application;

  let mapped = [xlsxRow(FIELDS[USING_BROKER], mapYesNoField(broker[USING_BROKER]))];

  if (broker[USING_BROKER]) {
    mapped = [
      ...mapped,
      xlsxRow(FIELDS[BROKER_NAME], broker[BROKER_NAME]),
      xlsxRow(FIELDS[FULL_ADDRESS], broker[FULL_ADDRESS]),
      xlsxRow(FIELDS[EMAIL], broker[EMAIL]),
    ];
  }

  return mapped;
};

/**
 * mapExporterBusiness
 * Map an application's exporter business fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapExporterBusiness = (application: Application) => {
  const { business, company, companySicCodes } = application;
  const { differentTradingAddress } = company;

  /**
   * financial year end date should only be populated if it exists.
   * Otherwise, return default text.
   */

  // TODO: constant
  let financialYearEndDate = 'No data from Companies House';

  if (company[FINANCIAL_YEAR_END_DATE]) {
    financialYearEndDate = formatDate(company[FINANCIAL_YEAR_END_DATE], 'd MMMM');
  }

  // TODO: documentation
  // TODO: unit tests
  const hasDifferentTradingName = company[HAS_DIFFERENT_TRADING_NAME];

  const hasDifferentTradingAddress = differentTradingAddress[ALTERNATIVE_TRADING_ADDRESS.FULL_ADDRESS];

  let mapped = [
    xlsxRow(SECTION_TITLES.EXPORTER_BUSINESS, ''),
    xlsxRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),
    xlsxRow(FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),
    xlsxRow(FIELDS[HAS_DIFFERENT_TRADING_NAME], mapYesNoField(company[HAS_DIFFERENT_TRADING_NAME])),
  ];

  if (hasDifferentTradingName) {
    mapped.push(xlsxRow(FIELDS[DIFFERENT_TRADING_NAME], company[DIFFERENT_TRADING_NAME]));
  }

  mapped.push(xlsxRow(FIELDS[TRADING_ADDRESS], mapYesNoField(company[TRADING_ADDRESS])));

  if (hasDifferentTradingAddress) {
    mapped.push(xlsxRow(FIELDS[ALTERNATIVE_TRADING_ADDRESS.FULL_ADDRESS], differentTradingAddress[ALTERNATIVE_TRADING_ADDRESS.FULL_ADDRESS]));
  }

  mapped = [
    ...mapped,

    xlsxRow(FIELDS[WEBSITE], company[WEBSITE]),
    xlsxRow(FIELDS[PHONE_NUMBER], company[PHONE_NUMBER]),

    xlsxRow(FIELDS[GOODS_OR_SERVICES], business[GOODS_OR_SERVICES]),
    xlsxRow(FIELDS[YEARS_EXPORTING], business[YEARS_EXPORTING]),
    xlsxRow(FIELDS[EMPLOYEES_UK], business[EMPLOYEES_UK]),
    xlsxRow(FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
    xlsxRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

    xlsxRow(FIELDS[HAS_CREDIT_CONTROL], mapYesNoField(business[HAS_CREDIT_CONTROL])),

    xlsxRow(FIELDS[COMPANY_SIC], mapSicCodes(companySicCodes)),

    xlsxRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, financialYearEndDate),

    ...mapBroker(application),
  ];

  return mapped;
};

export default mapExporterBusiness;
