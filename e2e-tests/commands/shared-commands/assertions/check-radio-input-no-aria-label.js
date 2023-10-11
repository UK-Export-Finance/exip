import { noRadioInput } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';
import checkAriaLabel from './check-aria-label';

/**
 * checkRadioInputNoAriaLabel
 * Check a "no" radio input's aria label
 * @param {String} Expected message without "No" copy
 */
const checkRadioInputNoAriaLabel = (message) => {
  const expectedMessage = `${message} ${FIELD_VALUES.NO}`;

  checkAriaLabel(noRadioInput(), expectedMessage);
};

export default checkRadioInputNoAriaLabel;
