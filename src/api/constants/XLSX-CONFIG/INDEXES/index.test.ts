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
        POLICY: 48,
        BUYER: 57,
        DECLARATIONS: 65,
      };

      expect(TITLE_INDEXES()).toEqual(expected);
    });
  });

  describe('INDEXES', () => {
    it('should return default indexes', () => {
      const expected = {
        TITLES: TITLE_INDEXES(),
        COMPANY_ADDRESS: 33,
        COMPANY_SIC_CODES: 44,
        BUYER_ADDRESS: 64,
      };

      expect(INDEXES()).toEqual(expected);
    });
  });

  describe('incrementIndexes', () => {
    it('should return incremented indexes', () => {
      const mockIndexes = {
        COMPANY_SIC_CODES: 1,
        BROKER_ADDRESS: 2,
        BUYER_ADDRESS: 3,
        TITLES: {
          POLICY: 4,
          BUYER: 5,
          DECLARATIONS: 6,
        },
      } as XLSXRowIndexes;

      const result = incrementIndexes(mockIndexes);

      const expected = {
        COMPANY_SIC_CODES: 2,
        BROKER_ADDRESS: 3,
        BUYER_ADDRESS: 4,
        TITLES: {
          POLICY: 5,
          BUYER: 6,
          DECLARATIONS: 7,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
