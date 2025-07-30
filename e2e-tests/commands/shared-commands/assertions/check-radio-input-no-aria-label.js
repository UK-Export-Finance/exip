import { noRadioInput } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';
import checkAriaLabel from './check-aria-label';

/**
 * checkRadioInputNoAriaLabel
 * Check a "no" radio input's aria label
 * @param {string} Expected message without "No" copy
 * @param {number} index: Optional radio index
 */
const checkRadioInputNoAriaLabel = (message, index) => {
  const expectedMessage = `${message} ${FIELD_VALUES.NO}`;

  let selector;

  if (index) {
    selector = noRadioInput().eq(index);
  } else {
    selector = noRadioInput();
  }

  checkAriaLabel(selector, expectedMessage);
};

export default checkRadioInputNoAriaLabel;
