type ObjectType = {
  [key: string]: any;
};

/**
 * objectHasKeysAndValues
 * Check if an object has keys and values
 * @param {Object} Object to check
 * @returns {Boolean}
 */
export const objectHasKeysAndValues = (obj: ObjectType) => {
  const keys = Object.keys(obj);

  if (!keys.length) {
    return false;
  }

  let hasValues = false;

  keys.forEach((key) => {
    if (obj[key]) {
      hasValues = true;
    }
  });

  return hasValues;
};

/**
 * isAnObjectWithKeysAndValues
 * Check if a field is an object with keys and values
 */
export const isAnObjectWithKeysAndValues = (field: any): object | undefined => {
  if (typeof field === 'object' && objectHasKeysAndValues(field)) {
    return field;
  }
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
