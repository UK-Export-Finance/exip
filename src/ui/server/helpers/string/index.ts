/**
 * stripCommas
 * Remove commas from a string
 * @param {String}
 * @returns {String} String without commas
 */
const stripCommas = (str: string) => str.replace(/[,]/g, '');

export { stripCommas };
