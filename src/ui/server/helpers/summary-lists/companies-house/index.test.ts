import formatDate from '../../date/format-date';
import { generateFields, companiesHouseSummaryList } from '.';
import generateSicCodesValue from './generate-sic-codes-value';
import generateSummaryListRows from '../generate-summary-list-rows';
import fieldGroupItem from '../generate-field-group-item';
import getFieldById from '../../get-field-by-id';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { FIELDS } from '../../../content-strings';
import { mockCompany } from '../../../test-mocks';
import generateMultipleFieldHtml from '../../generate-multiple-field-html';

const {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/companies-house', () => {
  describe('generateFields', () => {
    const isApplicationData = true;
    const result = generateFields(mockCompany, isApplicationData);

    it(`it should populate a ${COMPANY_NUMBER} field`, () => {
      const expected = fieldGroupItem({
        field: getFieldById(FIELDS, COMPANY_NUMBER),
        data: mockCompany,
      });

      expect(result[0]).toEqual(expected);
    });

    it(`it should populate a ${COMPANY_NAME} field`, () => {
      const expected = fieldGroupItem({
        field: getFieldById(FIELDS, COMPANY_NAME),
        data: mockCompany,
      });

      expect(result[1]).toEqual(expected);
    });

    it(`it should populate a ${COMPANY_ADDRESS} field`, () => {
      const expected = fieldGroupItem(
        {
          field: getFieldById(FIELDS, COMPANY_ADDRESS),
          data: mockCompany,
        },
        generateMultipleFieldHtml(mockCompany[COMPANY_ADDRESS]),
      );

      expect(result[2]).toEqual(expected);
    });

    it(`it should populate a ${COMPANY_INCORPORATED} field`, () => {
      const expected = fieldGroupItem(
        {
          field: getFieldById(FIELDS, COMPANY_INCORPORATED),
          data: mockCompany,
        },
        formatDate(mockCompany[COMPANY_INCORPORATED]),
      );

      expect(result[3]).toEqual(expected);
    });

    it(`it should populate a ${COMPANY_SIC} field`, () => {
      const expected = fieldGroupItem(
        {
          field: getFieldById(FIELDS, COMPANY_SIC),
          data: mockCompany,
        },
        generateSicCodesValue(mockCompany, isApplicationData),
      );

      expect(result[4]).toEqual(expected);
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
