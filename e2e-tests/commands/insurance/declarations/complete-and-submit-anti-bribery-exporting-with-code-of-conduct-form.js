import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitAntiBriberyExportingWithCodeOfConductForm
 * @param {String} Yes/no answer
 */
const completeAndSubmitAntiBriberyExportingWithCodeOfConductForm = (answer) => {
  if (answer === FIELD_VALUES.NO) {
    cy.clickNoRadioInput();
  } else {
    cy.clickYesRadioInput(0);
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitAntiBriberyExportingWithCodeOfConductForm;
