import { GBP_CURRENCY_CODE } from '../fixtures/currencies';

/**
 * formatCurrency
 * Transform a number into a currency string
 * @param {String} str: Amount
 * @param {String} Currency code - defaults to GBP
 * @returns {String} formatted currency
 */
const formatCurrency = (str, currency = GBP_CURRENCY_CODE) => Number(str).toLocaleString('en', {
  style: 'currency',
  currency,
  minimumFractionDigits: 0,
});

export default formatCurrency;
