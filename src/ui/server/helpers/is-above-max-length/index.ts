/**
 * checks that string is not over a maximum length
 * @param {String}: string: String to check
 * @param {Integer} maximum: Maximum length
 * @returns {Boolean}
 */
const isAboveMaxLength = (string: string, maximum: number) => string.length > maximum;

export default isAboveMaxLength;
