/**
 * isEmptyString
 * Check if a string is empty
 * @param {String}
 * @returns {Boolean}
 */
const isEmptyString = (str: string) => str === '';

/**
 * isPopulatedString
 * checks if string exists and length is above 0
 * @param {String} str
 * @returns {Boolean}
 */
const isPopulatedString = (str: string) => Boolean(str && str.length > 0);

/**
 * stripCommas
 * Remove commas from a string
 * @param {String}
 * @returns {String} String without commas
 */
const stripCommas = (str: string) => str.replace(/,/g, '');

export { isEmptyString, stripCommas, isPopulatedString };
