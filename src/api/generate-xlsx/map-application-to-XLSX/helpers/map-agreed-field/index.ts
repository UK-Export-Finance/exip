import { DEFAULT, XLSX } from '../../../../content-strings';

/**
 * mapAgreedField
 * Map a "true" field to "Agreed"
 * @param {Boolean} answer
 * @returns {String} "Agreed" or DEFAULT.EMPTY
 */
const mapAgreedField = (answer?: boolean) => {
  if (answer === true) {
    return XLSX.AGREED;
  }

  return DEFAULT.EMPTY;
};

export default mapAgreedField;
