import { BUTTONS } from '../../../content-strings';
import { saveAndBackButton } from '../../../pages/shared';

/**
 * assertSaveAndBackButton
 * Check that a "Save and back" button exists.
 */
const assertSaveAndBackButton = () => {
  cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
};

export default assertSaveAndBackButton;
