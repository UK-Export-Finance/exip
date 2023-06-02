import { DEFAULT } from '../../content-strings';
import { FIELD_VALUES } from '../../constants';

/**
 * mapYesNoField
 * maps true or false fields to Yes/No
 * @param {Boolean} answer
 * @returns {String} Yes/No or original provided answer
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
