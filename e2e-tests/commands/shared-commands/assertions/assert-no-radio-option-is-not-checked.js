import { noRadioInput } from '../../../pages/shared';

/**
 * assertNoRadioOptionIsNotChecked
 * Assert that a "no" radio option is not checked.
 * @param {number} index: Optional radio index
 */
const assertNoRadioOptionIsNotChecked = (index) => {
  cy.assertRadioOptionIsNotChecked(noRadioInput(), index);
};

export default assertNoRadioOptionIsNotChecked;
