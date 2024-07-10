import { submitButton } from '../../pages/shared';

import { BUTTONS } from '../../content-strings';

/**
 * assertSubmitAndSaveButtons
 * @param {String} Custom submit button copy to assert
 */
const assertSubmitAndSaveButtons = (submitButtonCopy = BUTTONS.CONTINUE) => {
  cy.checkText(submitButton(), submitButtonCopy);
  cy.assertSaveAndBackButton();
};

export default assertSubmitAndSaveButtons;
