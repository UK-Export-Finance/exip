/**
 * isPopulatedArray
 * Check if an array is populated
 * @param {Array}
 * @returns {Boolean}
 */
export const isPopulatedArray = (arr?: Array<any>): boolean => {
  if (arr && arr.length) {
    return true;
  }

  return false;
};

/**
 * stringArrayHasValue
 * Check if an array is populated and has an item at index
 * @param {Array}
 * @returns {Boolean}
 */
export const stringArrayHasValue = (index: number, array?: Array<string>) => {
  if (array && isPopulatedArray(array) && array[index]) {
    return true;
  }

  return false;
};
