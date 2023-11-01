import { sanitiseValue } from '../sanitise-value';

/**
 * sanitiseArrayOfStrings
 * Sanitise an array of strings
 * @param {Array} Array of strings
 * @returns {Array} Sanitised array
 */
const sanitiseArrayOfStrings = (arr: Array<string>) => {
  const sanitised = arr.map((str: string) => sanitiseValue({ key: str, value: str }));

  return sanitised;
};

export default sanitiseArrayOfStrings;
