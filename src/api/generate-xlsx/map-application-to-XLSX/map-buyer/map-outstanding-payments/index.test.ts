import mapOutstandingPayments from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as CONTENT_STRINGS } from '../../../../content-strings/fields/insurance/your-buyer';
import formatCurrency from '../../../../helpers/format-currency';
import xlsxRow from '../../helpers/xlsx-row';
import { mockBuyerTradingHistory } from '../../../../test-mocks/mock-buyer';

const {
  CURRENCY: { CURRENCY_CODE },
  YOUR_BUYER: { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE },
} = INSURANCE_FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-outstanding-payments', () => {
  describe(`when buyer trading history has an ${OUTSTANDING_PAYMENTS} value of true`, () => {
    it('should return mapped trading history data', () => {
      const mockTradingHistory = {
        ...mockBuyerTradingHistory,
        [OUTSTANDING_PAYMENTS]: true,
      };

      const result = mapOutstandingPayments(mockTradingHistory);

      const expectedValues = {
        totalOutstanding: formatCurrency(mockTradingHistory[TOTAL_OUTSTANDING_PAYMENTS], mockTradingHistory[CURRENCY_CODE]),
        totalAmountOverdue: formatCurrency(mockTradingHistory[TOTAL_AMOUNT_OVERDUE], mockTradingHistory[CURRENCY_CODE]),
      };

      const expected = [
        xlsxRow(String(FIELDS[TOTAL_OUTSTANDING_PAYMENTS]), expectedValues.totalOutstanding),
        xlsxRow(String(CONTENT_STRINGS[TOTAL_AMOUNT_OVERDUE].SUMMARY?.TITLE), expectedValues.totalAmountOverdue),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when buyer trading history has an ${OUTSTANDING_PAYMENTS} value of false`, () => {
    it('should return an empty array', () => {
      const mockTradingHistory = {
        ...mockBuyerTradingHistory,
        [OUTSTANDING_PAYMENTS]: false,
      };

      const result = mapOutstandingPayments(mockTradingHistory);

      expect(result).toEqual([]);
    });
  });

  describe(`when buyer trading history has an ${OUTSTANDING_PAYMENTS} value of undefined`, () => {
    it('should return an empty array', () => {
      const mockTradingHistory = {
        ...mockBuyerTradingHistory,
        [OUTSTANDING_PAYMENTS]: undefined,
      };

      const result = mapOutstandingPayments(mockTradingHistory);

      expect(result).toEqual([]);
    });
  });
});
