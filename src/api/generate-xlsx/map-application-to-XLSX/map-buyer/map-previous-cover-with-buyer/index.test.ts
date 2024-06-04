import mapPreviousCoverWithBuyer from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import { mockBuyerRelationship } from '../../../../test-mocks/mock-buyer';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-previous-cover-with-buyer', () => {
  describe(`when buyer relationship has a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} value of true`, () => {
    it('should return an xlsxRow', () => {
      const mockRelationship = {
        ...mockBuyerRelationship,
        [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: true,
      };

      const result = mapPreviousCoverWithBuyer(mockRelationship);

      const expected = xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mockRelationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when buyer relationship has a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} value of false`, () => {
    it('should not return anything', () => {
      const mockRelationship = {
        ...mockBuyerRelationship,
        [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: false,
      };

      const result = mapPreviousCoverWithBuyer(mockRelationship);

      expect(result).toBeUndefined();
    });
  });

  describe(`when buyer relationship has a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} value of undefined`, () => {
    it('should not return anything', () => {
      const mockRelationship = {
        ...mockBuyerRelationship,
        [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: undefined,
      };

      const result = mapPreviousCoverWithBuyer(mockRelationship);

      expect(result).toBeUndefined();
    });
  });
});
