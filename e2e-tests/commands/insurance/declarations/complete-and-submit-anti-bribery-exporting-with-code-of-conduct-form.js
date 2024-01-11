import { yesRadio, noRadio } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitAntiBriberyExportingWithCodeOfConductForm
 * @param {String} Yes/no answer
 */
const completeAndSubmitAntiBriberyExportingWithCodeOfConductForm = (answer) => {
  if (answer === FIELD_VALUES.NO) {
    noRadio().input().click();
  } else {
    yesRadio().input().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitAntiBriberyExportingWithCodeOfConductForm;
