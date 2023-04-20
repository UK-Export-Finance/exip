import mapExporter, { mapExporterBroker } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/exporter-business';
import { CSV_SECTION_TITLES } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { ANSWERS } from '../../../constants';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
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
  describe('mapExporterBroker', () => {
    describe(`when ${USING_BROKER} is ${ANSWERS.YES}`, () => {
      it('should return an array of mapped exporter fields', () => {
        const result = mapExporterBroker(mockApplication);

        const { exporterBroker } = mockApplication;

        const expected = [
          csvRow(CONTENT_STRINGS[USING_BROKER].SUMMARY?.TITLE, exporterBroker[USING_BROKER]),
          csvRow(CONTENT_STRINGS[BROKER_NAME].SUMMARY?.TITLE, exporterBroker[BROKER_NAME]),
          csvRow(
            CONTENT_STRINGS[ADDRESS_LINE_1].SUMMARY?.TITLE,
            `${exporterBroker[ADDRESS_LINE_1]} ${NEW_LINE} ${exporterBroker[TOWN]} ${NEW_LINE} ${exporterBroker[COUNTY]} ${NEW_LINE} ${exporterBroker[POSTCODE]}`,
          ),
          csvRow(CONTENT_STRINGS[EMAIL].SUMMARY?.TITLE, exporterBroker[EMAIL]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${USING_BROKER} is ${ANSWERS.NO}`, () => {
      it('should return an array of mapped exporter fields', () => {
        const mockApplicationNoBroker = {
          ...mockApplication,
          exporterBroker: {
            ...mockApplication.exporterBroker,
            [USING_BROKER]: ANSWERS.NO,
          },
        };

        const result = mapExporterBroker(mockApplicationNoBroker);

        const { exporterBroker } = mockApplicationNoBroker;

        const expected = [csvRow(CONTENT_STRINGS[USING_BROKER].SUMMARY?.TITLE, exporterBroker[USING_BROKER])];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapExporter', () => {
    it('should return an array of mapped exporter fields', () => {
      const result = mapExporter(mockApplication);

      const { exporterCompany, exporterBusiness } = mockApplication;

      const expected = [
        csvRow(CSV_SECTION_TITLES.EXPORTER_BUSINESS, ''),

        // exporter company fields
        csvRow(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE, exporterCompany[COMPANY_NUMBER]),
        csvRow(CONTENT_STRINGS[COMPANY_NAME].SUMMARY?.TITLE, exporterCompany[COMPANY_NAME]),
        csvRow(CONTENT_STRINGS[COMPANY_ADDRESS].SUMMARY?.TITLE, exporterCompany[COMPANY_ADDRESS]),
        csvRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(exporterCompany[COMPANY_INCORPORATED])),
        csvRow(CONTENT_STRINGS[COMPANY_SIC].SUMMARY?.TITLE, exporterCompany[COMPANY_SIC]),
        csvRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, formatDate(exporterCompany[FINANCIAL_YEAR_END_DATE])),
        csvRow(CONTENT_STRINGS[TRADING_NAME].SUMMARY?.TITLE, exporterCompany[TRADING_NAME]),
        csvRow(CONTENT_STRINGS[TRADING_ADDRESS].SUMMARY?.TITLE, exporterCompany[TRADING_ADDRESS]),
        csvRow(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE, exporterCompany[WEBSITE]),
        csvRow(CONTENT_STRINGS[PHONE_NUMBER].SUMMARY?.TITLE, exporterCompany[PHONE_NUMBER]),

        // exporter business fields
        csvRow(CONTENT_STRINGS[GOODS_OR_SERVICES].SUMMARY?.TITLE, exporterBusiness[GOODS_OR_SERVICES]),
        csvRow(CONTENT_STRINGS[YEARS_EXPORTING].SUMMARY?.TITLE, exporterBusiness[YEARS_EXPORTING]),
        csvRow(CONTENT_STRINGS[EMPLOYEES_UK].SUMMARY?.TITLE, exporterBusiness[EMPLOYEES_UK]),
        csvRow(CONTENT_STRINGS[EMPLOYEES_INTERNATIONAL].SUMMARY?.TITLE, exporterBusiness[EMPLOYEES_INTERNATIONAL]),
        csvRow(CONTENT_STRINGS[ESTIMATED_ANNUAL_TURNOVER].SUMMARY?.TITLE, exporterBusiness[ESTIMATED_ANNUAL_TURNOVER]),
        csvRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, exporterBusiness[PERCENTAGE_TURNOVER]),

        // exporter broker fields
        ...mapExporterBroker(mockApplication),
      ];

      expect(result).toEqual(expected);
    });
  });
});
