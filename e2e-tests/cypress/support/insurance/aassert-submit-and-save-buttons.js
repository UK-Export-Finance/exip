import { submitButton, saveAndBackButton } from '../../e2e/pages/shared';

import { BUTTONS } from '../../../content-strings';

const assertSubmitAndSaveButtons = () => {
  submitButton().should('exist');

  cy.checkText(submitButton(), BUTTONS.CONTINUE);

  saveAndBackButton().should('exist');

  cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
};

export default assertChangeAnswersPageUrl;
