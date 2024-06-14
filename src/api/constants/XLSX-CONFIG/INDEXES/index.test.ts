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
        BUYER: 60,
        EXPORT_CONTRACT: 69,
        DECLARATIONS: 75,
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
        BROKER_ADDRESS: 59,
        BUYER_ADDRESS: 62,
        LOSS_PAYEE_ADDRESS: 63,
        AGENT_ADDRESS: 0,
      };

      expect(INDEXES()).toEqual(expected);
    });
  });

  describe('incrementIndexes', () => {
    it('should return incremented indexes', () => {
      const mockIndexes = {
        BROKER_ADDRESS: 1,
        BUYER_ADDRESS: 2,
        LOSS_PAYEE_ADDRESS: 3,
        TITLES: {
          BUYER: 4,
          DECLARATIONS: 5,
          EXPORT_CONTRACT: 6,
          POLICY: 7,
        },
      } as XLSXRowIndexes;

      const result = incrementIndexes(mockIndexes);

      const expected = {
        BROKER_ADDRESS: 2,
        BUYER_ADDRESS: 3,
        LOSS_PAYEE_ADDRESS: 4,
        TITLES: {
          BUYER: 5,
          DECLARATIONS: 6,
          EXPORT_CONTRACT: 7,
          POLICY: 8,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
