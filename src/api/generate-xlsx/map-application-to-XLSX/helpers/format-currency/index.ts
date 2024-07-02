/**
 * formatCurrency
 * Transform a number into a currency string
 * @param {Number} Amount
 * @param {String} Currency code
 * @param {Number} Decimal places
 * @returns {String}
 */
const formatCurrency = (number: number, currencyCode: string, decimalPlaces?: number): string =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  });

export default formatCurrency;
