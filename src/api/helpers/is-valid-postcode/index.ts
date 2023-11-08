import { postcodeValidator } from 'postcode-validator';

/**
  Validates if a value is a valid postcode
 * @param {String} postcode - the value to validate
 * @returns Boolean - true if valid, false if not
 */
export const isValidPostcode = (postcode: string): boolean => postcodeValidator(postcode, 'GB');
