import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapOutstandingPayments from '../map-outstanding-payments';
import { BuyerTradingHistory } from '../../../../types';

const { FAILED_PAYMENTS, OUTSTANDING_PAYMENTS, TRADED_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapBuyerTradingHistory
 * Map an application's "buyer trading history" fields into an array of objects for XLSX generation
 * @param {BuyerTradingHistory} tradingHistory: Buyer trading history
 * @returns {Array} Array of objects for XLSX generation
 */
const mapBuyerTradingHistory = (tradingHistory: BuyerTradingHistory) => {
  if (tradingHistory[TRADED_WITH_BUYER]) {
    const mapped = [
      xlsxRow(String(FIELDS[OUTSTANDING_PAYMENTS]), mapYesNoField({ answer: tradingHistory[OUTSTANDING_PAYMENTS] })),

      ...mapOutstandingPayments(tradingHistory),

      xlsxRow(String(FIELDS[FAILED_PAYMENTS]), mapYesNoField({ answer: tradingHistory[FAILED_PAYMENTS] })),
    ];

    return mapped;
  }

  return [];
};

export default mapBuyerTradingHistory;
