import { noRadioInput } from '../../../pages/shared';

/**
 * assertNoRadioOptionIsChecked
 * Assert that a "no" radio option is checked.
 * @param {Integer} index: Optional radio index
 */
const assertNoRadioOptionIsChecked = (index) => {
  cy.assertRadioOptionIsChecked(noRadioInput(), index);
};

export default assertNoRadioOptionIsChecked;
