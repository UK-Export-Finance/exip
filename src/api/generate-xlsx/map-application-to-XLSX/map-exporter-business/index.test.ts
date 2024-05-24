import mapExporter, { mapSicCodes, mapBroker } from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { FIELDS as YOUR_BUSINESS_FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { GBP_CURRENCY_CODE } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import mapExporterAddress from './map-address';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import NEW_LINE from '../helpers/xlsx-new-line';
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
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, PHONE_NUMBER, TRADING_ADDRESS, WEBSITE },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    // ALTERNATIVE_TRADING_ADDRESS: { ALTERNATIVE_TRADING_FULL_ADDRESS },
    HAS_CREDIT_CONTROL,
  },
  POLICY: {
    USING_BROKER,
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL, FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

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
  describe('mapSicCodes', () => {
    it('should return a string of SIC codes', () => {
      const sicCodes = mockApplication.companySicCodes;

      const result = mapSicCodes(sicCodes);

      const [first, last] = sicCodes;

      const expectedFirst = `${first.sicCode} - ${first.industrySectorName}${NEW_LINE}`;

      const expectedLast = `${last.sicCode} - ${last.industrySectorName}${NEW_LINE}`;

      const expected = `${expectedFirst}${expectedLast}`;

      expect(result).toEqual(expected);
    });
  });

  describe('mapBroker', () => {
    describe(`when ${USING_BROKER} is true`, () => {
      it('should return an array of mapped exporter fields', () => {
        const result = mapBroker(mockApplication);

        const { broker } = mockApplication;

        const expected = [
          xlsxRow(XLSX.FIELDS[USING_BROKER], mapYesNoField(broker[USING_BROKER])),
          xlsxRow(XLSX.FIELDS[BROKER_NAME], broker[BROKER_NAME]),
          xlsxRow(XLSX.FIELDS[FULL_ADDRESS], broker[FULL_ADDRESS]),
          xlsxRow(XLSX.FIELDS[EMAIL], broker[EMAIL]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${USING_BROKER} is false`, () => {
      it('should return an array of mapped exporter fields', () => {
        const mockApplicationNoBroker = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [USING_BROKER]: false,
          },
        };

        const result = mapBroker(mockApplicationNoBroker);

        const { broker } = mockApplicationNoBroker;

        const expected = [xlsxRow(XLSX.FIELDS[USING_BROKER], mapYesNoField(broker[USING_BROKER]))];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapExporter', () => {
    it('should return an array of mapped exporter fields', () => {
      const result = mapExporter(mockApplication);

      const { company, companySicCodes, business } = mockApplication;

      const financialYearEndDate = formatDate(company[FINANCIAL_YEAR_END_DATE], 'd MMMM');

      const expected = expectedMapExporterArray(company, companySicCodes, business, financialYearEndDate);

      expect(result).toEqual(expected);
    });

    describe('when financial year end date does not exist', () => {
      it('should return an array of mapped exporter fields with financialYearEndDate as an empty string', () => {
        const noFinancialYearEndDateApplication = mockApplication;

        noFinancialYearEndDateApplication.company[FINANCIAL_YEAR_END_DATE] = null;

        const result = mapExporter(noFinancialYearEndDateApplication);

        const { company, companySicCodes, business } = noFinancialYearEndDateApplication;

        const financialYearEndDate = 'No data from Companies House';

        const expected = expectedMapExporterArray(company, companySicCodes, business, financialYearEndDate);

        expect(result).toEqual(expected);
      });
    });
  });
});
