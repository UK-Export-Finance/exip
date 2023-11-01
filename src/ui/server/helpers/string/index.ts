/**
 * isAString
 * Check if a value is a string
 * @param {String}
 * @returns {Boolean}
 */
const isAString = (value: any) => typeof value === 'string';

/**
 * isEmptyString
 * Check if a string is empty
 * @param {String}
 * @returns {Boolean}
 */
const isEmptyString = (str: string) => str === '';

/**
 * isPopulatedString
 * checks if string exists and length is above 0
 * @param {String} str
 * @returns {Boolean}
 */
const isPopulatedString = (str?: string) => Boolean(str && str.length > 0);

/**
 * stripCommas
 * Remove commas from a string
 * @param {String}
 * @returns {String} String without commas
 */
const stripCommas = (str: string) => str.replace(/,/g, '');

/**
 * stringsAreDefined
 * checks that strings are not null or undefined and greater length than 0
 * @param {String} str1
 * @param {String} str2
 * @returns {Boolean}
 */
const stringsAreDefined = (str1?: string, str2?: string) => isPopulatedString(str1) && isPopulatedString(str2);

/**
 * stringsAreEqual
 * checks that strings are the same
 * @param {String} str1
 * @param {String} str2
 * @returns {Boolean}
 */
const stringsAreEqual = (str1: string, str2: string) => str1 === str2;

export { isAString, isEmptyString, stripCommas, isPopulatedString, stringsAreDefined, stringsAreEqual };
