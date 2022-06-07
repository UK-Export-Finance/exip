const getLastSubstring = (str) =>
  str.substring(str.lastIndexOf('/') + 1);

module.exports = getLastSubstring;
