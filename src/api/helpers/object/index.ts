import { ObjectType } from '../../types';

/**
 * objectHasKeysAndValues
 * Check if an object has keys and values
 * @param {ObjectType} Object to check
 * @returns {boolean}
 */
export const objectHasKeysAndValues = (obj?: ObjectType) => {
  if (!obj) {
    return false;
  }

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
