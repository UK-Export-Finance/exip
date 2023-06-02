/**
 * checks that string is not over maximum length of varchar in DB
 * @param {string} response
 * @returns {Boolean}
 */
const isAboveMaxLength = (string: string, maximum: number) => string.length > maximum;

export default isAboveMaxLength;
