type ObjectType = {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * objectHasValues
 * Check if an object has values
 * @param {Object} Object to check
 * @returns {Boolean}
 */
const objectHasValues = (obj: ObjectType) => {
  if (obj && Object.keys(obj).length > 0) {
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
const objectHasProperty = (obj: ObjectType, propertyName: string) => {
  if (obj[propertyName]) {
    return true;
  }

  return false;
};

export { objectHasValues, objectHasProperty };
