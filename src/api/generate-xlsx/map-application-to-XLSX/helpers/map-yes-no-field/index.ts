import { DEFAULT } from '../../../../content-strings';

// TODO: object structured
// TODO: yes/no values as content strings.
/**
 * mapYesNoField
 * Map a "true" or "false" field to Yes/No
 * @param {Boolean} answer
 * @returns {String} "Yes/No" or DEFAULT.EMPTY
 */
const mapYesNoField = (answer?: boolean, defaultValue?: string) => {
  if (answer === false) {
    return 'No';
  }

  if (answer === true) {
    return 'Yes';
  }

  if (defaultValue) {
    return defaultValue;
  }

  return DEFAULT.EMPTY;
};

export default mapYesNoField;
