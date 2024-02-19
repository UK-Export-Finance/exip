import { DEFAULT } from '../../../../content-strings';

/**
 * mapYesNoField
 * Map a "true" or "false" field to Yes/No
 * @param {Boolean} answer
 * @returns {String} "Yes/No" or DEFAULT.EMPTY
 */
const mapYesNoField = (answer?: boolean) => {
  if (answer === false) {
    return 'No';
  }

  if (answer === true) {
    return 'Yes';
  }

  return DEFAULT.EMPTY;
};

export default mapYesNoField;
