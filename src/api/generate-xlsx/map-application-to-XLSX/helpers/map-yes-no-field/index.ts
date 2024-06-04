import { FIELD_VALUES } from '../../../../constants';
import { DEFAULT } from '../../../../content-strings';
import { MapYesNoFieldParams } from '../../../../types';

const { YES, NO } = FIELD_VALUES;

/**
 * mapYesNoField
 * Map a "true" or "false" field to Yes/No
 * @param {Boolean} answer: The boolean answer to map into a yes/no string.
 * @param {String} defaultValue: Custom default value.
 * @returns {String} "Yes/No" or DEFAULT.EMPTY
 */
const mapYesNoField = ({ answer, defaultValue }: MapYesNoFieldParams): string => {
  if (answer === false) {
    return NO;
  }

  if (answer === true) {
    return YES;
  }

  if (defaultValue) {
    return defaultValue;
  }

  return DEFAULT.EMPTY;
};

export default mapYesNoField;
