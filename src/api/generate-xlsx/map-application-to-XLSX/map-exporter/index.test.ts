import mapExporter, { mapSicCodes, mapBroker } from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { GBP_CURRENCY_CODE } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import mapExporterAddress from './map-address';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import NEW_LINE from '../helpers/xlsx-new-line';
import { mockApplication } from '../../../test-mocks';
import mapYesNoField from '../helpers/map-yes-no-field';

const CONTENT_STRINGS = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER,
  ...FIELDS.BROKER_DETAILS,
};

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_NUMBER, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
  POLICY: {
    BROKER: { USING_BROKER },
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL, FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const expectedMapExporterArray = (company, companySicCodes, business, financialYearEndDateValue) => [
  xlsxRow(XLSX.SECTION_TITLES.EXPORTER_BUSINESS, ''),

  // company fields
  xlsxRow(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE, company[COMPANY_NUMBER]),
  xlsxRow(XLSX.FIELDS[COMPANY_NAME], company[COMPANY_NAME]),
  xlsxRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),

  xlsxRow(XLSX.FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),

  xlsxRow(CONTENT_STRINGS[HAS_DIFFERENT_TRADING_NAME].SUMMARY?.TITLE, mapYesNoField(company[HAS_DIFFERENT_TRADING_NAME])),
  xlsxRow(CONTENT_STRINGS[TRADING_ADDRESS].SUMMARY?.TITLE, mapYesNoField(company[TRADING_ADDRESS])),

  xlsxRow(XLSX.FIELDS[COMPANY_SIC], mapSicCodes(companySicCodes)),

  xlsxRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, financialYearEndDateValue),
  xlsxRow(XLSX.FIELDS[WEBSITE], company[WEBSITE]),
  xlsxRow(XLSX.FIELDS[PHONE_NUMBER], company[PHONE_NUMBER]),

  // business fields
  xlsxRow(XLSX.FIELDS[GOODS_OR_SERVICES], business[GOODS_OR_SERVICES]),
  xlsxRow(XLSX.FIELDS[YEARS_EXPORTING], business[YEARS_EXPORTING]),
  xlsxRow(XLSX.FIELDS[EMPLOYEES_UK], business[EMPLOYEES_UK]),
  xlsxRow(XLSX.FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(business[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
  xlsxRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER]}%`),

  // broker fields
  ...mapBroker(mockApplication),
];

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter', () => {
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
