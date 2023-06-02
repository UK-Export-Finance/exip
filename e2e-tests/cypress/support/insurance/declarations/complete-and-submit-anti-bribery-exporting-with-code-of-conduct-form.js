import { yesRadio, noRadio, submitButton } from '../../../e2e/pages/shared';
import { FIELD_VALUES } from '../../../../constants';

/**
 * completeAndSubmitAntiBriberyExportingWithCodeOfConductForm
 * @param {String} Yes/no answer
 */
const completeAndSubmitAntiBriberyExportingWithCodeOfConductForm = (answer) => {
  if (answer === FIELD_VALUES.NO) {
    noRadio().click();
  } else {
    yesRadio().click();
  }

  submitButton().click();
};

export default completeAndSubmitAntiBriberyExportingWithCodeOfConductForm;
