import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitAntiBriberyExportingWithCodeOfConductForm
 * Complete and submit the "anti-bribery - exporting with code of conduct" form.
 * @param {String} Yes/no answer
 */
const completeAndSubmitAntiBriberyExportingWithCodeOfConductForm = (answer) => {
  if (answer === FIELD_VALUES.NO) {
    cy.clickNoRadioInput();
  } else {
    cy.clickYesRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitAntiBriberyExportingWithCodeOfConductForm;
