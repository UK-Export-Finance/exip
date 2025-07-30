/**
 * formatCurrency
 * Transform a number into a currency string
 * @param {number} Amount
 * @param {string} Currency code
 * @param {number} Decimal places
 * @returns {string}
 */
const formatCurrency = (number: number, currencyCode: string, decimalPlaces?: number): string =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  });

export default formatCurrency;
