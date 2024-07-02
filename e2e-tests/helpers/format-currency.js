import { GBP_CURRENCY_CODE } from '../fixtures/currencies';

/**
 * formatCurrency
 * Transform a number into a currency string
 * @param {String} str: Amount
 * @param {String} Currency code - defaults to GBP
 * @param {Number} decimalPlaces - defaults to 0
 * @returns {String} formatted currency
 */
const formatCurrency = (str, currency = GBP_CURRENCY_CODE, decimalPlaces = 0) =>
  Number(str).toLocaleString('en', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimalPlaces,
  });

export default formatCurrency;
