import { GBP_CURRENCY_CODE } from '../fixtures/currencies';

/**
 * formatCurrency
 * Transform a number into a currency string
 * @param {string} str: Amount
 * @param {string} Currency code - defaults to GBP
 * @param {number} decimalPlaces - defaults to 0
 * @returns {string} formatted currency
 */
const formatCurrency = (str, currency = GBP_CURRENCY_CODE, decimalPlaces = 0) =>
  Number(str).toLocaleString('en', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimalPlaces,
  });

export default formatCurrency;
