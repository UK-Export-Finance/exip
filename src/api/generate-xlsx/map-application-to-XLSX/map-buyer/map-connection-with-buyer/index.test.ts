import mapConnectionWithBuyer from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import { mockBuyerRelationship } from '../../../../test-mocks/mock-buyer';

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-connection-with-buyer', () => {
  describe(`when buyer relationship has a ${CONNECTION_WITH_BUYER} value of true`, () => {
    it('should return an xlsxRow', () => {
      const mockRelationship = {
        ...mockBuyerRelationship,
        [CONNECTION_WITH_BUYER]: true,
      };

      const result = mapConnectionWithBuyer(mockRelationship);

      const expected = xlsxRow(String(FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION]), mockRelationship[CONNECTION_WITH_BUYER_DESCRIPTION]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when buyer relationship has a ${CONNECTION_WITH_BUYER} value of false`, () => {
    it('should not return anything', () => {
      const mockRelationship = {
        ...mockBuyerRelationship,
        [CONNECTION_WITH_BUYER]: false,
      };

      const result = mapConnectionWithBuyer(mockRelationship);

      expect(result).toBeUndefined();
    });
  });

  describe(`when buyer relationship has a ${CONNECTION_WITH_BUYER} value of undefined`, () => {
    it('should not return anything', () => {
      const mockRelationship = {
        ...mockBuyerRelationship,
        [CONNECTION_WITH_BUYER]: undefined,
      };

      const result = mapConnectionWithBuyer(mockRelationship);

      expect(result).toBeUndefined();
    });
  });
});
