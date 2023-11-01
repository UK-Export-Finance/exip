import { sanitiseValue } from '../sanitise-value';

/**
 * sanitiseArrayOfStrings
 * Sanitise an array of strings
 * @param {String} Field key
 * @param {Array} Array of strings
 * @returns {Array} Sanitised array
 */
const sanitiseArrayOfStrings = (key: string, arr: Array<string>) => {
  const sanitised = arr.map((str: string) => sanitiseValue({ key, value: str }));

  return sanitised;
};

export default sanitiseArrayOfStrings;
