/**
 * isAString
 * Check if a value is a string
 * @param {String}
 * @returns {Boolean}
 */
export const isAString = (value: any) => typeof value === 'string';

/**
 * isEmptyString
 * Check if a string is empty
 * @param {String}
 * @returns {Boolean}
 */
export const isEmptyString = (str: string) => str === '';

/**
 * isPopulatedString
 * checks if string exists and length is above 0
 * @param {String} str
 * @returns {Boolean}
 */
export const isPopulatedString = (str?: string) => Boolean(str && str.length > 0);

/**
 * stripCommas
 * Remove commas from a string
 * @param {String}
 * @returns {String} String without commas
 */
export const stripCommas = (str: string) => str.replace(/,/g, '');

/**
 * stringsAreDefined
 * checks that strings are not null or undefined and greater length than 0
 * @param {String} str1
 * @param {String} str2
 * @returns {Boolean}
 */
export const stringsAreDefined = (str1?: string, str2?: string) => isPopulatedString(str1) && isPopulatedString(str2);

/**
 * stringsAreEqual
 * checks that strings are the same
 * @param {String} str1
 * @param {String} str2
 * @returns {Boolean}
 */
export const stringsAreEqual = (str1: string, str2: string) => str1 === str2;

/**
 * isBelowMinLength
 * checks that string is not below a minimum length
 * @param {String}: string: String to check
 * @param {Integer} minimum: Minimum length
 * @returns {Boolean}
 */
export const isBelowMinLength = (string: string, minimum: number) => string.length < minimum;

/**
 * isAboveMaxLength
 * checks that string is not over a maximum length
 * @param {String}: string: String to check
 * @param {Integer} maximum: Maximum length
 * @returns {Boolean}
 */
export const isAboveMaxLength = (string: string, maximum: number) => string.length > maximum;
