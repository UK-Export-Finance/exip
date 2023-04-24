import formatDate from '../date/format-date';
import { generateSicCodesValue, generateFields, companyHouseSummaryList } from './company-house-summary-list';
import generateSummaryListRows from './generate-summary-list-rows';
import fieldGroupItem from './generate-field-group-item';
import getFieldById from '../get-field-by-id';
import { FIELD_IDS } from '../../constants';
import { DEFAULT, FIELDS, PAGES } from '../../content-strings';
import { mockCompany } from '../../test-mocks';
import generateMultipleFieldHtml from '../generate-multiple-field-html';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC } = COMPANY_HOUSE;

describe('server/helpers/summary-lists/company-house-summary-list', () => {
  describe('generateSicCodesValue', () => {
    describe('when sicCodes and sicCodeDescriptions both are populated', () => {
      it('should return sic code and description as a single string with line break', () => {
        const result = generateSicCodesValue(mockCompany.sicCodes, mockCompany.sicCodeDescriptions);

        const expected = `${mockCompany.sicCodes[0]} - ${mockCompany.sicCodeDescriptions[0]} </br>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when sicCodes is only populated', () => {
      it('should return sic code as a single string with line break', () => {
        const result = generateSicCodesValue(mockCompany.sicCodes);

        const expected = `${mockCompany.sicCodes[0]} </br>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when sicCodes and sicCodeDescriptions both are populated and have multiple values', () => {
      it('should return sic code and description as a single string with line break', () => {
        const sicCodes = [...mockCompany.sicCodes, '12345'];
        const sicCodeDescriptions = [...mockCompany.sicCodeDescriptions, 'test 2'];

        const result = generateSicCodesValue(sicCodes, sicCodeDescriptions);

        const expected = `${sicCodes[0]} - ${sicCodeDescriptions[0]} </br>${sicCodes[1]} - ${sicCodeDescriptions[1]} </br>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when sicCodes is populated and has multiple values', () => {
      it('should return sic code and description as a single string with line break', () => {
        const sicCodes = [...mockCompany.sicCodes, '12345'];

        const result = generateSicCodesValue(sicCodes);

        const expected = `${sicCodes[0]} </br>${sicCodes[1]} </br>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when sicCodes is only populated', () => {
      it('should return sic code as a single string with line break', () => {
        const result = generateSicCodesValue(mockCompany.sicCodes);

        const expected = `${mockCompany.sicCodes[0]} </br>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when sic codes is an empty array', () => {
      it('should return default empty string', () => {
        const result = generateSicCodesValue([]);

        const expected = DEFAULT.EMPTY;

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no sic codes (undefined)', () => {
      it('should return default empty string', () => {
        const result = generateSicCodesValue(undefined);

        const expected = DEFAULT.EMPTY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateFields', () => {
    it('should populate field groups when provided with companyDetails', () => {
      const result = generateFields(mockCompany);

      const expected = [
        fieldGroupItem({
          field: getFieldById(FIELDS, COMPANY_NUMBER),
          data: mockCompany,
        }),
        fieldGroupItem({
          field: getFieldById(FIELDS, COMPANY_NAME),
          data: mockCompany,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, COMPANY_ADDRESS),
            data: mockCompany,
          },
          generateMultipleFieldHtml(mockCompany[COMPANY_ADDRESS]),
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, COMPANY_INCORPORATED),
            data: mockCompany,
          },
          formatDate(mockCompany[COMPANY_INCORPORATED]),
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, COMPANY_SIC),
            data: mockCompany,
          },
          generateSicCodesValue(mockCompany.sicCodes, mockCompany.sicCodeDescriptions),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('companyHouseSummaryList()', () => {
    it('should return a mapped summary list for companies house response', () => {
      const fields = generateFields(mockCompany);

      const result = companyHouseSummaryList(mockCompany);

      const expected = {
        COMPANY_DETAILS: {
          GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_NAME,
          ROWS: generateSummaryListRows(fields),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
