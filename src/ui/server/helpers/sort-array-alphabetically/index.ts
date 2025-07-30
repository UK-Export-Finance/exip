/**
 * sortArrayAlphabetically
 * Sort an array alphabetically by targeting a specific field to sort by
 * @param {Array} Array of objects
 * @param {string} Target field to sort by
 * @returns {Array} Array of objects sorted alphabetically
 */
const sortArrayAlphabetically = (arr: Array<any>, field: string) => {
  const alphabetical = arr.sort((a, b) => a[field].localeCompare(b[field]));

  return alphabetical;
};

export default sortArrayAlphabetically;
