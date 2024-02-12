import { yesRadioInput } from '../../../pages/shared';

/**
 * clickYesRadioInput
 * Click a "yes" radio input.
 * * @param {Integer} index: Optional radio index
 */
const clickYesRadioInput = (index = 0) => {
  yesRadioInput().eq(index).click();
};

export default clickYesRadioInput;
