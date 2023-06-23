/**
 * isEmptyString
 * Check if a string is empty
 * @param {String}
 * @returns {Boolean}
 */
const isEmptyString = (str: string) => str === '';

/**
 * stripCommas
 * Remove commas from a string
 * @param {String}
 * @returns {String} String without commas
 */
const stripCommas = (str: string) => str.replace(/,/g, '');

export { isEmptyString, stripCommas };
