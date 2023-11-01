import formatDate from '../date/format-date';
import { generateSicCodesValue, generateFields, companyHouseSummaryList } from './company-house-summary-list';
import generateSummaryListRows from './generate-summary-list-rows';
import fieldGroupItem from './generate-field-group-item';
import getFieldById from '../get-field-by-id';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { DEFAULT, FIELDS, PAGES } from '../../content-strings';
import { mockCompany } from '../../test-mocks';
import generateMultipleFieldHtml from '../generate-multiple-field-html';

const {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/company-house-summary-list', () => {
  describe('generateSicCodesValue', () => {
    describe('when sicCodes and industrySectorNames both are populated', () => {
      it('should return sic code and description as a single string with line break', () => {
        const result = generateSicCodesValue(mockCompany.sicCodes, mockCompany.industrySectorNames);

        const expected = `${mockCompany.sicCodes[0]} - ${mockCompany.industrySectorNames[0]} </br>`;

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

    describe('when sicCodes and industrySectorNames both are populated and have multiple values', () => {
      it('should return sic code and description as a single string with line break', () => {
        const sicCodes = [...mockCompany.sicCodes, '12345'];
        const industrySectorNames = [...mockCompany.industrySectorNames, 'test 2'];

        const result = generateSicCodesValue(sicCodes, industrySectorNames);

        const expected = `${sicCodes[0]} - ${industrySectorNames[0]} </br>${sicCodes[1]} - ${industrySectorNames[1]} </br>`;

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

    describe('when sicCodes only has one value and industrySectorNames is not populated', () => {
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
        const result = generateSicCodesValue();

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
          generateSicCodesValue(mockCompany.sicCodes, mockCompany.industrySectorNames),
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
          GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_HEADING,
          ROWS: generateSummaryListRows(fields),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
