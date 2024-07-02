/**
 * isNumber
 * Check if the provided string or number, is a number
 * @param {String | Number} Value to check
 * @returns {Boolean}
 */
const isNumber = (value: string | number) => {
  if (value) {
    return !Number.isNaN(Number(value));
  }

  return false;
};

/**
 * numberHasDecimal
 * Check if a number has decimal points
 * @param {Number}
 * @returns {Boolean}
 */
const numberHasDecimal = (value: number) => String(value).includes('.');

/**
 * getPercentageOfNumber
 * Get a percentage from a number
 * @param {Number} Desired percentage
 * @param {Number} Number to get the percentage from
 * @returns {String} percentage
 */
const getPercentageOfNumber = (percent: number, total: number) => ((percent / 100) * total).toFixed(2);

/**
 * isNumberBelowMinimum
 * checks if number is less than a certain value
 * @param {Number} value
 * @param {Number} minimum
 * @returns {Boolean}
 */
const isNumberBelowMinimum = (value: number, minimum: number) => value < minimum;

/**
 * isNumberAboveMaximum
 * checks if number is more than a certain value
 * @param {Number} value
 * @param {Number} minimum
 * @returns {Boolean}
 */
const isNumberAboveMaximum = (value: number, maximum: number) => value > maximum;

/**
 * transformEmptyDecimalsToWholeNumber
 * if number has .00 at the end
 * removes the .00 and transforms to whole number
 * @param {String} value
 * @returns {String} transformed number as a string
 */
const transformEmptyDecimalsToWholeNumber = (value: string) => value.replace(/\.00$/, '');

/**
 * checks if number has decimal places via modulus check
 * @param {Number || String} value
 * @returns {Boolean}
 */
const doesNumberHaveDecimalPlaces = (value: number | string) => Number(value) % 1 !== 0;

export {
  isNumber,
  numberHasDecimal,
  getPercentageOfNumber,
  isNumberBelowMinimum,
  isNumberAboveMaximum,
  transformEmptyDecimalsToWholeNumber,
  doesNumberHaveDecimalPlaces,
};
