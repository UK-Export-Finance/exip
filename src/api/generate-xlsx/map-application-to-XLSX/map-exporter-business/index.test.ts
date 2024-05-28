import mapExporterBusiness from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../content-strings';
import { FIELDS as YOUR_BUSINESS_FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { GBP_CURRENCY_CODE } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import mapBroker from './map-broker';
import mapExporterAddress from './map-exporter-address';
import mapSicCodes from './map-sic-codes';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import { mockApplication } from '../../../test-mocks';
import mapYesNoField from '../helpers/map-yes-no-field';

const { FIELDS, SECTION_TITLES } = XLSX;

const CONTENT_STRINGS = {
  ...YOUR_BUSINESS_FIELDS.COMPANY_DETAILS,
  ...YOUR_BUSINESS_FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...YOUR_BUSINESS_FIELDS.TURNOVER,
  ...YOUR_BUSINESS_FIELDS.BROKER,
  ...YOUR_BUSINESS_FIELDS.BROKER_DETAILS,
};

const {
  COMPANIES_HOUSE: { COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, PHONE_NUMBER, TRADING_ADDRESS, WEBSITE },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  HAS_CREDIT_CONTROL,
} = FIELD_IDS;

const expectedMapExporterArray = (company, companySicCodes, business, financialYearEndDateValue) => [
  xlsxRow(SECTION_TITLES.EXPORTER_BUSINESS, ''),

  xlsxRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),
  xlsxRow(FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),
  xlsxRow(FIELDS[COMPANY_SIC], mapSicCodes(companySicCodes)),

  xlsxRow(FIELDS[HAS_DIFFERENT_TRADING_NAME], mapYesNoField(company[HAS_DIFFERENT_TRADING_NAME])),
  xlsxRow(FIELDS[TRADING_ADDRESS], mapYesNoField(company[TRADING_ADDRESS])),

  xlsxRow(FIELDS[WEBSITE], company[WEBSITE]),
  xlsxRow(FIELDS[PHONE_NUMBER], company[PHONE_NUMBER]),

  xlsxRow(FIELDS[GOODS_OR_SERVICES], business[GOODS_OR_SERVICES]),
  xlsxRow(FIELDS[YEARS_EXPORTING], business[YEARS_EXPORTING]),
  xlsxRow(FIELDS[EMPLOYEES_UK], business[EMPLOYEES_UK]),
  xlsxRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, financialYearEndDateValue),
  xlsxRow(FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
  xlsxRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

  xlsxRow(FIELDS[HAS_CREDIT_CONTROL], mapYesNoField(business[HAS_CREDIT_CONTROL])),

  ...mapBroker(mockApplication),
];

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business', () => {
  it('should return an array of mapped exporter fields', () => {
    const result = mapExporterBusiness(mockApplication);

    const { company, companySicCodes, business } = mockApplication;

    const financialYearEndDate = formatDate(company[FINANCIAL_YEAR_END_DATE], 'd MMMM');

    const expected = expectedMapExporterArray(company, companySicCodes, business, financialYearEndDate);

    expect(result).toEqual(expected);
  });

  describe('when financial year end date does not exist', () => {
    it('should return an array of mapped exporter fields with financialYearEndDate as an empty string', () => {
      const noFinancialYearEndDateApplication = mockApplication;

      noFinancialYearEndDateApplication.company[FINANCIAL_YEAR_END_DATE] = null;

      const result = mapExporterBusiness(noFinancialYearEndDateApplication);

      const { company, companySicCodes, business } = noFinancialYearEndDateApplication;

      const financialYearEndDate = FIELDS.NO_FINANCIAL_YEAR_END_DATE;

      const expected = expectedMapExporterArray(company, companySicCodes, business, financialYearEndDate);

      expect(result).toEqual(expected);
    });
  });
});
