import { DEFAULT } from '../../content-strings';
import { FIELD_VALUES } from '../../constants';

/**
 * mapYesNoField
 * maps true or false fields to Yes/No
 * @param {boolean} answer
 * @returns {string} Yes/No or original provided answer
 */
const mapYesNoField = (answer?: boolean) => {
  if (answer === false) {
    return FIELD_VALUES.NO;
  }

  if (answer === true) {
    return FIELD_VALUES.YES;
  }

  return DEFAULT.EMPTY;
};

export default mapYesNoField;
