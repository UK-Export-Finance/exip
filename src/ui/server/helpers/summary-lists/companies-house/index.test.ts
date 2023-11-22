import formatDate from '../../date/format-date';
import { generateSicCodesValue, generateFields, companiesHouseSummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import fieldGroupItem from '../generate-field-group-item';
import getFieldById from '../../get-field-by-id';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { DEFAULT, FIELDS } from '../../../content-strings';
import { mockCompany } from '../../../test-mocks';
import generateMultipleFieldHtml from '../../generate-multiple-field-html';

const {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/companies-house', () => {
  describe('generateSicCodesValue', () => {
    describe('when sicCodes and industrySectorNames both are populated', () => {
      it('should return sic code and description as a single string with line break', () => {
        const mockSectors = ['Mock sector'];

        const result = generateSicCodesValue(mockCompany.sicCodes, mockSectors);

        let sicCode;
        if (mockCompany.sicCodes) {
          const [firstSicCode] = mockCompany.sicCodes;
          sicCode = firstSicCode;
        }

        const [industrySectorName] = mockSectors;

        const expected = `${sicCode} - ${industrySectorName} </br>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when sic codes is not populated', () => {
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
          generateSicCodesValue(mockCompany.sicCodes),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('companiesHouseSummaryList', () => {
    it('should return a mapped summary list for companies house response', () => {
      const fields = generateFields(mockCompany);

      const result = companiesHouseSummaryList(mockCompany);

      const expected = {
        COMPANY_DETAILS: {
          ROWS: generateSummaryListRows(fields),
        },
      };

      expect(result).toEqual(expected);
    });

    describe('when a company is not provided', () => {
      it('should return an empty object', () => {
        const result = companiesHouseSummaryList();

        expect(result).toEqual({});
      });
    });
  });
});
