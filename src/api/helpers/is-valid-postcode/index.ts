import { REGEX } from '../../constants';

const postCodeRegex = REGEX.POSTCODE;

/**
  Validates if a value is a valid postcode using a predefined regex
 * @param {String} postcode - the value to validate
 * @returns Boolean - true if valid, false if not
 */
export const isValidPostcode = (postcode: string): boolean => postCodeRegex.test(postcode);
