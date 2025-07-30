import { DEFAULT, XLSX } from '../../../../content-strings';

/**
 * mapAgreedField
 * Map a "true" field to "Agreed"
 * @param {boolean} answer
 * @returns {string} "Agreed" or DEFAULT.EMPTY
 */
const mapAgreedField = (answer?: boolean) => {
  if (answer === true) {
    return XLSX.AGREED;
  }

  return DEFAULT.EMPTY;
};

export default mapAgreedField;
