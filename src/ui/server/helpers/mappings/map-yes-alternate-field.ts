import { DEFAULT } from '../../content-strings';
import { FIELD_VALUES } from '../../constants';

/**
 * mapYesAlternateField
 * maps true or false fields and replaces true with alternate answer
 * example hasDifferentTradingName and differentTradingName
 * @param {Boolean} answer
 * @param {String} alternateAnswer - provided answer if true is selected
 * @returns {String} Alternate answer/No or empty
 */
const mapYesAlternateField = (answer?: boolean, alternateAnswer?: string) => {
  if (answer === false) {
    return FIELD_VALUES.NO;
  }

  if (answer === true) {
    return alternateAnswer;
  }

  return DEFAULT.EMPTY;
};

export default mapYesAlternateField;
