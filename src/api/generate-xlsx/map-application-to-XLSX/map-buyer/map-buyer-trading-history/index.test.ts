import mapBuyerTradingHistory from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapOutstandingPayments from '../map-outstanding-payments';
import { mockBuyerTradingHistory } from '../../../../test-mocks/mock-buyer';

const { FAILED_PAYMENTS, OUTSTANDING_PAYMENTS, TRADED_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer-trading-history', () => {
  describe(`when buyer trading history has a ${TRADED_WITH_BUYER} value of true`, () => {
    it('should return mapped trading history data', () => {
      const mockTradingHistory = {
        ...mockBuyerTradingHistory,
        [TRADED_WITH_BUYER]: true,
      };

      const result = mapBuyerTradingHistory(mockTradingHistory);

      const expected = [
        xlsxRow(String(FIELDS[OUTSTANDING_PAYMENTS]), mapYesNoField({ answer: mockTradingHistory[OUTSTANDING_PAYMENTS] })),

        ...mapOutstandingPayments(mockTradingHistory),

        xlsxRow(String(FIELDS[FAILED_PAYMENTS]), mapYesNoField({ answer: mockTradingHistory[FAILED_PAYMENTS] })),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when buyer trading history has a ${TRADED_WITH_BUYER} value of false`, () => {
    it('should return an empty array', () => {
      const mockTradingHistory = {
        ...mockBuyerTradingHistory,
        [TRADED_WITH_BUYER]: false,
      };

      const result = mapBuyerTradingHistory(mockTradingHistory);

      expect(result).toEqual([]);
    });
  });

  describe(`when buyer trading history has a ${TRADED_WITH_BUYER} value of undefined`, () => {
    it('should return an empty array', () => {
      const mockTradingHistory = {
        ...mockBuyerTradingHistory,
        [TRADED_WITH_BUYER]: undefined,
      };

      const result = mapBuyerTradingHistory(mockTradingHistory);

      expect(result).toEqual([]);
    });
  });
});
