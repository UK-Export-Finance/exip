import { submitButton, noRadioInput, yesRadioInput } from '../../pages/shared';

/**
 * completeAndSubmitCreditControlForm
 * complete and submit the "credit control" form.
 * @param {Boolean}: hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input
 */
const completeAndSubmitCreditControlForm = ({ hasCreditControlProcess = true }) => {
  if (hasCreditControlProcess) {
    yesRadioInput().click();
  } else {
    noRadioInput().click();
  }

  submitButton().click();
};

export default completeAndSubmitCreditControlForm;
