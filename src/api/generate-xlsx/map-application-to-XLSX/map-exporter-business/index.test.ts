import mapExporterBusiness from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../content-strings';
import { FIELDS as YOUR_BUSINESS_FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { GBP_CURRENCY_CODE } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import mapBroker from './map-broker';
import mapDifferentTradingName from './map-different-trading-name';
import mapDifferentTradingAddress from './map-different-trading-address';
import mapExporterAddress from './map-exporter-address';
import mapFinancialYearEndDate from './map-financial-year-end-date';
import mapSicCodes from './map-sic-codes';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import { mockApplication } from '../../../test-mocks';
import mapYesNoField from '../helpers/map-yes-no-field';

const CONTENT_STRINGS = {
  ...YOUR_BUSINESS_FIELDS.COMPANY_DETAILS,
  ...YOUR_BUSINESS_FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...YOUR_BUSINESS_FIELDS.TURNOVER,
  ...YOUR_BUSINESS_FIELDS.BROKER,
  ...YOUR_BUSINESS_FIELDS.BROKER_DETAILS,
};

const {
  COMPANIES_HOUSE: { COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER, WEBSITE },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  HAS_CREDIT_CONTROL,
} = FIELD_IDS;

const { FIELDS, SECTION_TITLES } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business', () => {
  it('should return an array of mapped exporter fields', () => {
    const result = mapExporterBusiness(mockApplication);

    const { company, companySicCodes, business } = mockApplication;

    const expected = [
      xlsxRow(SECTION_TITLES.EXPORTER_BUSINESS, ''),

      xlsxRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),
      xlsxRow(FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),
      xlsxRow(FIELDS[COMPANY_SIC], mapSicCodes(companySicCodes)),

      xlsxRow(FIELDS[HAS_DIFFERENT_TRADING_NAME], mapYesNoField(company[HAS_DIFFERENT_TRADING_NAME])),
      mapDifferentTradingName(company),

      xlsxRow(FIELDS[TRADING_ADDRESS], mapYesNoField(company[TRADING_ADDRESS])),
      mapDifferentTradingAddress(company),

      xlsxRow(FIELDS[WEBSITE], company[WEBSITE]),
      xlsxRow(FIELDS[PHONE_NUMBER], company[PHONE_NUMBER]),

      xlsxRow(FIELDS[GOODS_OR_SERVICES], business[GOODS_OR_SERVICES]),
      xlsxRow(FIELDS[YEARS_EXPORTING], business[YEARS_EXPORTING]),
      xlsxRow(FIELDS[EMPLOYEES_UK], business[EMPLOYEES_UK]),
      xlsxRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, mapFinancialYearEndDate(company)),
      xlsxRow(FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
      xlsxRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

      xlsxRow(FIELDS[HAS_CREDIT_CONTROL], mapYesNoField(business[HAS_CREDIT_CONTROL])),

      ...mapBroker(mockApplication),
    ];

    expect(result).toEqual(expected);
  });
});
