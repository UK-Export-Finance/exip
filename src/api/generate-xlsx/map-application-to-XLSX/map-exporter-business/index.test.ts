import mapExporterBusiness from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { DATE_FORMAT } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
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
  ...EXPORTER_BUSINESS_FIELDS.COMPANY_DETAILS,
  ...EXPORTER_BUSINESS_FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...EXPORTER_BUSINESS_FIELDS.TURNOVER,
  ...EXPORTER_BUSINESS_FIELDS.BROKER,
  ...EXPORTER_BUSINESS_FIELDS.BROKER_DETAILS,
};

const {
  COMPANIES_HOUSE: { COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, HAS_DIFFERENT_TRADING_ADDRESS, PHONE_NUMBER, WEBSITE },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
  HAS_CREDIT_CONTROL,
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business', () => {
  it('should return an array of mapped exporter fields', () => {
    const result = mapExporterBusiness(mockApplication);

    const { company, companySicCodes, business } = mockApplication;

    const expected = [
      xlsxRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], DATE_FORMAT.XLSX)),
      xlsxRow(String(FIELDS[COMPANY_ADDRESS]), mapExporterAddress(company[COMPANY_ADDRESS])),
      xlsxRow(String(FIELDS[COMPANY_SIC]), mapSicCodes(companySicCodes)),

      xlsxRow(String(FIELDS[HAS_DIFFERENT_TRADING_NAME]), mapYesNoField({ answer: company[HAS_DIFFERENT_TRADING_NAME] })),
      mapDifferentTradingName(company),

      xlsxRow(String(FIELDS[HAS_DIFFERENT_TRADING_ADDRESS]), mapYesNoField({ answer: company[HAS_DIFFERENT_TRADING_ADDRESS] })),
      mapDifferentTradingAddress(company),

      xlsxRow(String(FIELDS[WEBSITE]), company[WEBSITE]),
      xlsxRow(String(FIELDS[PHONE_NUMBER]), company[PHONE_NUMBER]),

      xlsxRow(String(FIELDS[GOODS_OR_SERVICES]), business[GOODS_OR_SERVICES]),
      xlsxRow(String(FIELDS[YEARS_EXPORTING]), business[YEARS_EXPORTING]),
      xlsxRow(String(FIELDS[EMPLOYEES_UK]), business[EMPLOYEES_UK]),
      xlsxRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, mapFinancialYearEndDate(company)),
      xlsxRow(String(FIELDS[ESTIMATED_ANNUAL_TURNOVER]), formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], business[TURNOVER_CURRENCY_CODE])),
      xlsxRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

      xlsxRow(String(FIELDS[HAS_CREDIT_CONTROL]), mapYesNoField({ answer: business[HAS_CREDIT_CONTROL] })),
    ];

    expect(result).toEqual(expected);
  });
});
