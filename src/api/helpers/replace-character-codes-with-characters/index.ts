/**
 * replaceCharacterCodesWithCharacters
 * Replace certain character codes with characters
 * @param {String}
 * @returns {String}
 */
const replaceCharacterCodesWithCharacters = (str: string): string =>
  str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#42;/g, '*')
    .replace(/&amp;/g, '&');

export default replaceCharacterCodesWithCharacters;
