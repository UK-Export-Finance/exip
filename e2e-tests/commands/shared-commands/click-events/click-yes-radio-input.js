import { yesRadio } from '../../../pages/shared';

/**
 * clickYesRadioInput
 * Click a "yes" radio input.
 * @param {number} index: Optional radio index
 */
const clickYesRadioInput = (index = 0) => {
  yesRadio().label().eq(index).click();
};

export default clickYesRadioInput;
