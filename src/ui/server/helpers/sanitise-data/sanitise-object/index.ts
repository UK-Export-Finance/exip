import sanitiseArrayOfStrings from '../sanitise-array-of-strings';
import { isAnObjectWithKeysAndValues } from '../../object';
import sanitiseValue from '../sanitise-value';
import { ObjectType } from '../../../../types';

/**
 * sanitiseObject
 * Sanitise an object
 * - If an object key value is an array, call sanitiseArrayOfStrings.
 * - If an object key value is an object, call sanitiseObject.
 * - Otherwise, sanitiseObjectValue is used for each value in the object.
 * @param {ObjectType}
 * @returns {boolean}
 */
const sanitiseObject = (obj: ObjectType) => {
  const sanitised = {} as ObjectType;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value) {
      if (Array.isArray(value)) {
        sanitised[key] = sanitiseArrayOfStrings(key, value);
      } else if (isAnObjectWithKeysAndValues(value)) {
        sanitised[key] = sanitiseObject(value);
      } else {
        sanitised[key] = sanitiseValue({ key, value });
      }
    }
  });

  return sanitised;
};

export default sanitiseObject;
