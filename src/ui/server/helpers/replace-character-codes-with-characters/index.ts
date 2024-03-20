import { isAString } from '../string';

/**
 * replaceCharacterCodesWithCharacters
 * Replace certain character codes with characters
 * @param {String}
 * @returns {String | null}
 */
const replaceCharacterCodesWithCharacters = (str?: string): string | null => {
  if (str && isAString(str)) {
    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&#42;/g, '*')
      .replace(/&amp;/g, '&')
      .replace(/\r\n/g, '\r');
  }

  return null;
};

export default replaceCharacterCodesWithCharacters;
