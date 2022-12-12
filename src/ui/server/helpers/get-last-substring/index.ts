/**
 * getLastSubstring
 * Get the last sub string in a string
 * @param {String}
 * @returns {String} Last sub string
 */
const getLastSubstring = (str: string) => {
  if (str) {
    return str.substring(str.lastIndexOf('/') + 1)
  }

  return null;
};

export default getLastSubstring;
