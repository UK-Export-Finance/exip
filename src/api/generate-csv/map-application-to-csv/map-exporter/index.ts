import FIELD_IDS from '../../../constants/field-ids/insurance/exporter-business';
import { CSV } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { ANSWERS, GBP_CURRENCY_CODE } from '../../../constants';
import csvRow from '../helpers/csv-row';
import mapExporterAddress from './map-address';
import formatDate from '../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import NEW_LINE from '../helpers/csv-new-line';
import { Application } from '../../../types';

const CONTENT_STRINGS = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER,
};

const {
  COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER, NAME: BROKER_NAME, ADDRESS_LINE_1, TOWN, COUNTY, POSTCODE, EMAIL },
} = FIELD_IDS;

/**
 * mapExporterBroker
 * Map an application's exporter broker fields into an array of objects for CSV generation
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
export const mapExporterBroker = (application: Application) => {
  const { exporterBroker } = application;

  let mapped = [csvRow(CSV.FIELDS[USING_BROKER], exporterBroker[USING_BROKER])];

  if (exporterBroker[USING_BROKER] === ANSWERS.YES) {
    mapped = [
      ...mapped,
      csvRow(CSV.FIELDS[BROKER_NAME], exporterBroker[BROKER_NAME]),
      csvRow(
        CSV.FIELDS[ADDRESS_LINE_1],
        `${exporterBroker[ADDRESS_LINE_1]} ${NEW_LINE} ${exporterBroker[TOWN]} ${NEW_LINE} ${exporterBroker[COUNTY]} ${NEW_LINE} ${exporterBroker[POSTCODE]}`,
      ),
      csvRow(CSV.FIELDS[EMAIL], exporterBroker[EMAIL]),
    ];
  }

  return mapped;
};

/**
 * mapExporter
 * Map an application's exporter fields into an array of objects for CSV generation
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapExporter = (application: Application) => {
  const { company, business } = application;

  const mapped = [
    csvRow(CSV.SECTION_TITLES.EXPORTER_BUSINESS, ''),

    // company fields
    csvRow(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE, company[COMPANY_NUMBER]),
    csvRow(CSV.FIELDS[COMPANY_NAME], company[COMPANY_NAME]),
    csvRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),

    csvRow(CSV.FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),

    csvRow(CONTENT_STRINGS[TRADING_NAME].SUMMARY?.TITLE, company[TRADING_NAME]),
    csvRow(CONTENT_STRINGS[TRADING_ADDRESS].SUMMARY?.TITLE, company[TRADING_ADDRESS]),

    csvRow(CSV.FIELDS[COMPANY_SIC], company[COMPANY_SIC]),
    csvRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, formatDate(company[FINANCIAL_YEAR_END_DATE], 'd MMMM')),
    csvRow(CSV.FIELDS[WEBSITE], company[WEBSITE]),
    csvRow(CSV.FIELDS[PHONE_NUMBER], company[PHONE_NUMBER]),

    // business fields
    csvRow(CSV.FIELDS[GOODS_OR_SERVICES], business[GOODS_OR_SERVICES]),
    csvRow(CSV.FIELDS[YEARS_EXPORTING], business[YEARS_EXPORTING]),
    csvRow(CSV.FIELDS[EMPLOYEES_UK], business[EMPLOYEES_UK]),
    csvRow(CSV.FIELDS[EMPLOYEES_INTERNATIONAL], business[EMPLOYEES_INTERNATIONAL]),
    csvRow(CSV.FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
    csvRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

    // exporter broker fields
    ...mapExporterBroker(application),
  ];

  return mapped;
};

export default mapExporter;
