import { yesRadioInput } from '../../../pages/shared';

/**
 * assertYesRadioOptionIsNotChecked
 * Assert that a "yes" radio option is not checked.
 * @param {number} index: Optional radio index
 */
const assertYesRadioOptionIsNotChecked = (index) => {
  cy.assertRadioOptionIsNotChecked(yesRadioInput(), index);
};

export default assertYesRadioOptionIsNotChecked;
