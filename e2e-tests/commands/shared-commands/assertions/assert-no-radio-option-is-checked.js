import { noRadioInput } from '../../../pages/shared';

/**
 * assertNoRadioOptionIsChecked
 * Assert that a "no" radio option is checked.
 */
const assertNoRadioOptionIsChecked = () => {
  cy.assertRadioOptionIsChecked(noRadioInput());
};

export default assertNoRadioOptionIsChecked;
