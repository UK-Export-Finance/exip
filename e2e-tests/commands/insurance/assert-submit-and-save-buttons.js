import { submitButton, saveAndBackButton } from '../../pages/shared';

import { BUTTONS } from '../../content-strings';

/**
 * assertSubmitAndSaveButtons
 * @param {String} Custom submit button copy to assert
 */
const assertSubmitAndSaveButtons = (submitButtonCopy = BUTTONS.CONTINUE) => {
  submitButton().should('exist');

  cy.checkText(submitButton(), submitButtonCopy);

  saveAndBackButton().should('exist');

  cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
};

export default assertSubmitAndSaveButtons;
