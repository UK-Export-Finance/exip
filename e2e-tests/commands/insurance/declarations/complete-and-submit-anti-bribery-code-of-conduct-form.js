import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitDeclarationAntiBriberyCodeOfConduct
 * @param {Boolean} Yes/no answer
 */
const completeAndSubmitDeclarationAntiBriberyCodeOfConduct = (answer) => {
  if (answer === FIELD_VALUES.NO) {
    cy.clickNoRadioInput();
  } else {
    cy.clickYesRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitDeclarationAntiBriberyCodeOfConduct;
