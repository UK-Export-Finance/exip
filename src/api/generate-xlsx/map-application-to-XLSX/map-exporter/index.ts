import FIELD_IDS from '../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { GBP_CURRENCY_CODE } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import mapExporterAddress from './map-address';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapYesNoField from '../helpers/map-yes-no-field';
import NEW_LINE from '../helpers/xlsx-new-line';
import { Application, ApplicationCompanySicCode } from '../../../types';

const CONTENT_STRINGS = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER,
};

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER, NAME: BROKER_NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL },
} = FIELD_IDS;

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

  let mapped = [xlsxRow(XLSX.FIELDS[USING_BROKER], mapYesNoField(broker[USING_BROKER]))];

  if (broker[USING_BROKER]) {
    const addressAnswer = {
      lineOneAndTwo: `${broker[ADDRESS_LINE_1]} ${NEW_LINE}${broker[ADDRESS_LINE_2]}`,
      other: `${NEW_LINE}${broker[TOWN]} ${NEW_LINE}${broker[COUNTY]} ${NEW_LINE}${broker[POSTCODE]}`,
    };

    mapped = [
      ...mapped,
      xlsxRow(XLSX.FIELDS[BROKER_NAME], broker[BROKER_NAME]),
      xlsxRow(XLSX.FIELDS[ADDRESS_LINE_1], `${addressAnswer.lineOneAndTwo}${addressAnswer.other}`),
      xlsxRow(XLSX.FIELDS[EMAIL], broker[EMAIL]),
    ];
  }

  return mapped;
};

/**
 * mapExporter
 * Map an application's exporter fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapExporter = (application: Application) => {
  const { company, companySicCodes, business } = application;
  let financialYearEndDate = 'No data from Companies House';

  // financial year end date should only be populated if it exists
  if (company[FINANCIAL_YEAR_END_DATE]) {
    financialYearEndDate = formatDate(company[FINANCIAL_YEAR_END_DATE], 'd MMMM');
  }

  const mapped = [
    xlsxRow(XLSX.SECTION_TITLES.EXPORTER_BUSINESS, ''),

    // company fields
    xlsxRow(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE, company[COMPANY_NUMBER]),
    xlsxRow(XLSX.FIELDS[COMPANY_NAME], company[COMPANY_NAME]),
    xlsxRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),

    xlsxRow(XLSX.FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),

    xlsxRow(CONTENT_STRINGS[TRADING_NAME].SUMMARY?.TITLE, mapYesNoField(company[TRADING_NAME])),
    xlsxRow(CONTENT_STRINGS[TRADING_ADDRESS].SUMMARY?.TITLE, mapYesNoField(company[TRADING_ADDRESS])),

    xlsxRow(XLSX.FIELDS[COMPANY_SIC], mapSicCodes(companySicCodes)),

    xlsxRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, financialYearEndDate),
    xlsxRow(XLSX.FIELDS[WEBSITE], company[WEBSITE]),
    xlsxRow(XLSX.FIELDS[PHONE_NUMBER], company[PHONE_NUMBER]),

    // business fields
    xlsxRow(XLSX.FIELDS[GOODS_OR_SERVICES], business[GOODS_OR_SERVICES]),
    xlsxRow(XLSX.FIELDS[YEARS_EXPORTING], business[YEARS_EXPORTING]),
    xlsxRow(XLSX.FIELDS[EMPLOYEES_UK], business[EMPLOYEES_UK]),
    xlsxRow(XLSX.FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
    xlsxRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

    // broker fields
    ...mapBroker(application),
  ];

  return mapped;
};

export default mapExporter;
