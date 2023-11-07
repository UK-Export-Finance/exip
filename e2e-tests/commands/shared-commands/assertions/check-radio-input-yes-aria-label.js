import { yesRadioInput } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';
import checkAriaLabel from './check-aria-label';

/**
 * checkRadioInputYesAriaLabel
 * Check a "yes" radio input's aria label
 * @param {String} Expected message without "Yes" copy
 */
const checkRadioInputYesAriaLabel = (message) => {
  const expectedMessage = `${message} ${FIELD_VALUES.YES}`;

  checkAriaLabel(yesRadioInput(), expectedMessage);
};

export default checkRadioInputYesAriaLabel;
