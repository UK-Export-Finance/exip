import mapExporter, { mapSicCodes, mapBroker } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/business';
import { CSV } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { ANSWERS, GBP_CURRENCY_CODE } from '../../../constants';
import csvRow from '../helpers/csv-row';
import mapExporterAddress from './map-address';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import NEW_LINE from '../helpers/csv-new-line';
import { mockApplication } from '../../../test-mocks';

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

describe('api/generate-csv/map-application-to-csv/map-exporter', () => {
  describe('mapSicCodes', () => {
    it('should return a string of SIC codes', () => {
      const sicCodes = mockApplication.companySicCode;

      const result = mapSicCodes(sicCodes);

      const first = sicCodes[0];
      const last = sicCodes[1];

      const expectedFirst = `${first.sicCode} - ${first.industrySectorName}${NEW_LINE}`;

      const expectedLast = `${last.sicCode} - ${last.industrySectorName}${NEW_LINE}`;

      const expected = `${expectedFirst}${expectedLast}`;

      expect(result).toEqual(expected);
    });
  });

  describe('mapBroker', () => {
    describe(`when ${USING_BROKER} is ${ANSWERS.YES}`, () => {
      it('should return an array of mapped exporter fields', () => {
        const result = mapBroker(mockApplication);

        const { broker } = mockApplication;

        const expected = [
          csvRow(CSV.FIELDS[USING_BROKER], broker[USING_BROKER]),
          csvRow(CSV.FIELDS[BROKER_NAME], broker[BROKER_NAME]),
          csvRow(
            CSV.FIELDS[ADDRESS_LINE_1],
            `${broker[ADDRESS_LINE_1]} ${NEW_LINE} ${broker[TOWN]} ${NEW_LINE} ${broker[COUNTY]} ${NEW_LINE} ${broker[POSTCODE]}`,
          ),
          csvRow(CSV.FIELDS[EMAIL], broker[EMAIL]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${USING_BROKER} is ${ANSWERS.NO}`, () => {
      it('should return an array of mapped exporter fields', () => {
        const mockApplicationNoBroker = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [USING_BROKER]: ANSWERS.NO,
          },
        };

        const result = mapBroker(mockApplicationNoBroker);

        const { broker } = mockApplicationNoBroker;

        const expected = [csvRow(CSV.FIELDS[USING_BROKER], broker[USING_BROKER])];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapExporter', () => {
    it('should return an array of mapped exporter fields', () => {
      const result = mapExporter(mockApplication);

      const { company, companySicCode, business } = mockApplication;

      const expected = [
        csvRow(CSV.SECTION_TITLES.EXPORTER_BUSINESS, ''),

        // company fields
        csvRow(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE, company[COMPANY_NUMBER]),
        csvRow(CSV.FIELDS[COMPANY_NAME], company[COMPANY_NAME]),
        csvRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(company[COMPANY_INCORPORATED], 'dd-MMM-yy')),

        csvRow(CSV.FIELDS[COMPANY_ADDRESS], mapExporterAddress(company[COMPANY_ADDRESS])),

        csvRow(CONTENT_STRINGS[TRADING_NAME].SUMMARY?.TITLE, company[TRADING_NAME]),
        csvRow(CONTENT_STRINGS[TRADING_ADDRESS].SUMMARY?.TITLE, company[TRADING_ADDRESS]),

        csvRow(CSV.FIELDS[COMPANY_SIC], mapSicCodes(companySicCode)),

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

        // broker fields
        ...mapBroker(mockApplication),
      ];

      expect(result).toEqual(expected);
    });
  });
});
