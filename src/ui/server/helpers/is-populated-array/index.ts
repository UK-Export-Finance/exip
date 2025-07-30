/**
 * isPopulatedArray
 * Check if an array is populated
 * @param {Array}
 * @returns {boolean}
 */
const isPopulatedArray = (arr?: Array<any>): boolean => {
  if (arr?.length) {
    return true;
  }

  return false;
};

export default isPopulatedArray;
