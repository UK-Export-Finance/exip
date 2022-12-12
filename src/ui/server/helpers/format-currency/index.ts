/**
 * formatCurrency
 * Transform a number into a currency string
 * @param {Number} Amount
 * @param {String} Currency code
 * @param {Number} Decimal points
 * @returns {String}
 */
const formatCurrency = (number: number, currencyCode: string, decimalPoints: number): string =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPoints,
    maximumFractionDigits: decimalPoints,
  });

export default formatCurrency;
