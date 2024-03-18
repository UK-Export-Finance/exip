/**
 * checks that string is not below a minimum length
 * @param {String}: string: String to check
 * @param {Integer} minimum: Minimum length
 * @returns {Boolean}
 */
const isBelowMinLength = (string: string, minimum: number) => string.length < minimum;

export default isBelowMinLength;
