import { TITLE_INDEXES, INDEXES, incrementIndexes } from '.';
import { XLSXRowIndexes } from '../../../types';

describe('api/constants/XLSX-CONFIG/INDEXES', () => {
  describe('TITLE_INDEXES', () => {
    it('should return default title indexes', () => {
      const expected = {
        HEADER: 1,
        EXPORTER_CONTACT_DETAILS: 10,
        KEY_INFORMATION: 15,
        ELIGIBILITY: 21,
        EXPORTER_BUSINESS: 31,
        POLICY: 47,
        BUYER: 63,
        DECLARATIONS: 73,
      };

      expect(TITLE_INDEXES()).toEqual(expected);
    });
  });

  describe('INDEXES', () => {
    it('should return default indexes', () => {
      const expected = {
        TITLES: TITLE_INDEXES(),
        COMPANY_ADDRESS: 33,
        COMPANY_SIC_CODES: 34,
        BUYER_ADDRESS: 65,
      };

      expect(INDEXES()).toEqual(expected);
    });
  });

  describe('incrementIndexes', () => {
    it('should return incremented indexes', () => {
      const mockIndexes = {
        BROKER_ADDRESS: 1,
        BUYER_ADDRESS: 2,
        TITLES: {
          POLICY: 3,
          BUYER: 4,
          DECLARATIONS: 5,
        },
      } as XLSXRowIndexes;

      const result = incrementIndexes(mockIndexes);

      const expected = {
        BROKER_ADDRESS: 2,
        BUYER_ADDRESS: 3,
        TITLES: {
          POLICY: 4,
          BUYER: 5,
          DECLARATIONS: 6,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});