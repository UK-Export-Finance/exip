import { FIELD_VALUES } from '../../../../constants';
import { DEFAULT } from '../../../../content-strings';
import { MapYesNoFieldParams } from '../../../../types';

const { YES, NO } = FIELD_VALUES;

/**
 * mapYesNoField
 * Map a "true" or "false" field to Yes/No
 * @param {boolean} answer: The boolean answer to map into a yes/no string.
 * @returns {string} "Yes/No" or DEFAULT.EMPTY
 */
const mapYesNoField = ({ answer }: MapYesNoFieldParams): string => {
  if (answer === false) {
    return NO;
  }

  if (answer === true) {
    return YES;
  }

  return DEFAULT.EMPTY;
};

export default mapYesNoField;
