import { yesRadioInput } from '../../../pages/shared';

/**
 * assertYesRadioOptionIsChecked
 * Assert that a "yes" radio option is checked.
 * @param {Integer} index: Optional radio index
 */
const assertYesRadioOptionIsChecked = (index) => {
  cy.assertRadioOptionIsChecked(yesRadioInput(), index);
};

export default assertYesRadioOptionIsChecked;
