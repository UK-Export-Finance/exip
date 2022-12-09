/**
 * getLastSubstring
 * Get the last sub string in a string
 * @param {String}
 * @returns {String} Last sub string
 */
const getLastSubstring = (str: string) => str.substring(str.lastIndexOf('/') + 1);

export default getLastSubstring;
