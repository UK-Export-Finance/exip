/**
 * completeAndSubmitCreditControlForm
 * complete and submit the "credit control" form.
 * @param {Boolean}: hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input
 */
const completeAndSubmitCreditControlForm = ({ hasCreditControlProcess = true }) => {
  if (hasCreditControlProcess) {
    cy.clickYesRadioInput(0);
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitCreditControlForm;
