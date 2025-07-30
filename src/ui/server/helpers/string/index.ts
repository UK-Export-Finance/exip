/**
 * isAString
 * Check if a value is a string
 * @param {string}
 * @returns {boolean}
 */
export const isAString = (value: any) => typeof value === 'string';

/**
 * isEmptyString
 * Check if a string is empty
 * @param {string}
 * @returns {boolean}
 */
export const isEmptyString = (str?: string) => str === '';

/**
 * isPopulatedString
 * checks if string exists and length is above 0
 * @param {string} str
 * @returns {boolean}
 */
export const isPopulatedString = (str?: string) => Boolean(str && str.length > 0);

/**
 * stripCommas
 * Remove commas from a string
 * @param {string}
 * @returns {string} String without commas
 */
export const stripCommas = (str: string) => str.replace(/,/g, '');

/**
 * stringsAreDefined
 * checks that strings are not null or undefined and greater length than 0
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
export const stringsAreDefined = (str1?: string, str2?: string) => isPopulatedString(str1) && isPopulatedString(str2);

/**
 * stringsAreEqual
 * checks that strings are the same
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
export const stringsAreEqual = (str1: string, str2: string) => str1 === str2;

/**
 * isBelowMinLength
 * checks that string is not below a minimum length
 * @param {string}: string: String to check
 * @param {number} minimum: Minimum length
 * @returns {boolean}
 */
export const isBelowMinLength = (string: string, minimum: number) => string.length < minimum;

/**
 * isAboveMaxLength
 * checks that string is not over a maximum length
 * @param {string}: string: String to check
 * @param {number} maximum: Maximum length
 * @returns {boolean}
 */
export const isAboveMaxLength = (string: string, maximum: number) => string.length > maximum;
