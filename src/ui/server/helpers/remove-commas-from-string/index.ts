/**
 * removes commas from string
 * @param {string} string
 * @returns {string} with commas replaced
 */
const removeCommasFromString = (string: string) => string.replace(/,/g, '');

export default removeCommasFromString;
