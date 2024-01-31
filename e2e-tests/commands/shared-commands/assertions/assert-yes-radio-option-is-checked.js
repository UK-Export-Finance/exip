import { yesRadioInput } from '../../../pages/shared';

/**
 * assertYesRadioOptionIsChecked
 * Assert that a "yes" radio option is checked.
 */
const assertYesRadioOptionIsChecked = () => {
  cy.assertRadioOptionIsChecked(yesRadioInput());
};

export default assertYesRadioOptionIsChecked;
