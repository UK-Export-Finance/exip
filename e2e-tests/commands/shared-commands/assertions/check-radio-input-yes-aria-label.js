import { yesRadioInput } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';
import checkAriaLabel from './check-aria-label';

/**
 * checkRadioInputYesAriaLabel
 * Check a "yes" radio input's aria label
 * @param {String} Expected message without "Yes" copy
 * @param {Integer} index: Optional radio index
 */
const checkRadioInputYesAriaLabel = (message, index) => {
  const expectedMessage = `${message} ${FIELD_VALUES.YES}`;

  let selector;

  if (index) {
    selector = yesRadioInput().eq(index);
  } else {
    selector = yesRadioInput();
  }

  checkAriaLabel(selector, expectedMessage);
};

export default checkRadioInputYesAriaLabel;
