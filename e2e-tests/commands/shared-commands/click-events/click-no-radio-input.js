import { noRadio } from '../../../pages/shared';

/**
 * clickNoRadioInput
 * Click a "no" radio input.
 * @param {Integer} index: Optional radio index
 */
const clickNoRadioInput = (index = 0) => {
  noRadio().label().eq(index).click();
};

export default clickNoRadioInput;
