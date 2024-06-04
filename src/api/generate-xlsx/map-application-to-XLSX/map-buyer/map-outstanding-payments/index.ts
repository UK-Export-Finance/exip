import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as CONTENT_STRINGS } from '../../../../content-strings/fields/insurance/your-buyer';
import formatCurrency from '../../../../helpers/format-currency';
import xlsxRow from '../../helpers/xlsx-row';
import { BuyerTradingHistory } from '../../../../types';

const {
  CURRENCY: { CURRENCY_CODE },
  YOUR_BUYER: { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE },
} = INSURANCE_FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapOutstandingPayments
 * Map an application's "outstanding buyer payments" fields into an array of objects for XLSX generation
 * @param {BuyerTradingHistory} tradingHistory: Buyer trading history
 * @returns {Array} Array of objects for XLSX generation
 */
const mapOutstandingPayments = (tradingHistory: BuyerTradingHistory) => {
  if (tradingHistory[OUTSTANDING_PAYMENTS]) {
    const values = {
      totalOutstanding: formatCurrency(tradingHistory[TOTAL_OUTSTANDING_PAYMENTS], tradingHistory[CURRENCY_CODE]),
      totalAmountOverdue: formatCurrency(tradingHistory[TOTAL_AMOUNT_OVERDUE], tradingHistory[CURRENCY_CODE]),
    };

    const mapped = [
      xlsxRow(String(FIELDS[TOTAL_OUTSTANDING_PAYMENTS]), values.totalOutstanding),
      xlsxRow(String(CONTENT_STRINGS[TOTAL_AMOUNT_OVERDUE].SUMMARY?.TITLE), values.totalAmountOverdue),
    ];

    return mapped;
  }

  return [];
};

export default mapOutstandingPayments;
