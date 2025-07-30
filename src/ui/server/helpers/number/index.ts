import { REGEX } from '../../constants';

/**
 * isNumber
 * Check if the provided string or number, is a number
 * @param {String | Number} Value to check
 * @returns {boolean}
 */
const isNumber = (value: string | number) => {
  if (value) {
    return !Number.isNaN(Number(value));
  }

  return false;
};

/**
 * numberHasDecimal
 * Check if a number has decimal places
 * @param {number}
 * @returns {boolean}
 */
const numberHasDecimal = (value: number) => String(value).includes('.');

/**
 * getPercentageOfNumber
 * Get a percentage from a number
 * @param {number} Desired percentage
 * @param {number} Number to get the percentage from
 * @returns {string} percentage
 */
const getPercentageOfNumber = (percent: number, total: number) => ((percent / 100) * total).toFixed(2);

/**
 * isNumberBelowMinimum
 * checks if number is less than a certain value
 * @param {number} value
 * @param {number} minimum
 * @returns {boolean}
 */
const isNumberBelowMinimum = (value: number, minimum: number) => value < minimum;

/**
 * isNumberAboveMaximum
 * checks if number is more than a certain value
 * @param {number} value
 * @param {number} minimum
 * @returns {boolean}
 */
const isNumberAboveMaximum = (value: number, maximum: number) => value > maximum;

/**
 * transformEmptyDecimalsToWholeNumber
 * if number has .00 at the end
 * removes the .00 and transforms to whole number
 * @param {string} value
 * @returns {string} value without .00 unless it has other decimal places
 */
const transformEmptyDecimalsToWholeNumber = (value: string) => value.replace(REGEX.INCLUDES_DOUBLE_ZERO_DECIMALS, '');

/**
 * checks if number has decimal places via modulus check
 * @param {Number || String} value
 * @returns {boolean}
 */
const numberHasDecimalPlaces = (value: number | string) => Number(value) % 1 !== 0;

export {
  isNumber,
  numberHasDecimal,
  getPercentageOfNumber,
  isNumberBelowMinimum,
  isNumberAboveMaximum,
  transformEmptyDecimalsToWholeNumber,
  numberHasDecimalPlaces,
};
