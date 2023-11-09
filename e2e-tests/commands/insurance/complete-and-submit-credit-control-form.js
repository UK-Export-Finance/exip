import { submitButton, yesRadioInput } from '../../pages/shared';

/**
 * completeAndSubmitCreditControlForm
 * complete and submit the "credit control" form.
 */
const completeAndSubmitCreditControlForm = () => {
  yesRadioInput().click();

  submitButton().click();
};

export default completeAndSubmitCreditControlForm;
