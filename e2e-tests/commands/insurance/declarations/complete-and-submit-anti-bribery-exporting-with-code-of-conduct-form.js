import { yesRadio, noRadio, submitButton } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitAntiBriberyExportingWithCodeOfConductForm
 * @param {String} Yes/no answer
 */
const completeAndSubmitAntiBriberyExportingWithCodeOfConductForm = (answer) => {
  if (answer === FIELD_VALUES.NO) {
    noRadio().label().click();
  } else {
    yesRadio().label().click();
  }

  submitButton().click();
};

export default completeAndSubmitAntiBriberyExportingWithCodeOfConductForm;
