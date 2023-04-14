type ObjectType = {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * objectHasKeysAndValues
 * Check if an object has keys and values
 * @param {Object} Object to check
 * @returns {Boolean}
 */
export const objectHasKeysAndValues = (obj: ObjectType) => {
  if (Object.keys(obj).length > 0 && Object.values(obj).length > 0) {
    return true;
  }

  return false;
};

/**
 * objectHasProperty
 * Check if an object has a certain property
 * @param {Object}
 * @param {String} Property to check
 * @returns {Boolean}
 */
export const objectHasProperty = (obj: ObjectType, propertyName: string) => {
  if (obj[propertyName]) {
    return true;
  }

  return false;
};
