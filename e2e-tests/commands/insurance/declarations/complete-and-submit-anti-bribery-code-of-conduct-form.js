import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitDeclarationAntiBriberyCodeOfConduct
 * @param {String} Yes/no answer
 */
export default (answer) => {
  if (answer === FIELD_VALUES.NO) {
    cy.clickNoRadioInput();
  } else {
    cy.clickYesRadioInput();
  }

  cy.clickSubmitButton();
};
