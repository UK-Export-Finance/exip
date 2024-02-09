import { noRadioInput } from '../../../pages/shared';

/**
 * clickNoRadioInput
 * Click a "no" radio input.
 * @param {Integer} index: Optional radio index
 */
const clickNoRadioInput = (index) => {
  noRadioInput().eq(index).click();
};

export default clickNoRadioInput;
