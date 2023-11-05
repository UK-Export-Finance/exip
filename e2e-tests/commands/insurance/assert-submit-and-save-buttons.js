import { submitButton, saveAndBackButton } from '../../pages/shared';

import { BUTTONS } from '../../content-strings';

/**
 * assertSubmitAndSaveButtons
 * @param {String} Custom submit button copy to assert
 */
const assertSubmitAndSaveButtons = (submitButtonCopy = BUTTONS.CONTINUE) => {
  cy.checkText(submitButton(), submitButtonCopy);
  cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
};

export default assertSubmitAndSaveButtons;
