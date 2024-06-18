/**
 * completeAndSubmitLossPayeeForm
 * Complete and submit "loss payee" form
 * @param {Boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to "no".
 */
const completeAndSubmitLossPayeeForm = ({
  isAppointingLossPayee = false,
}) => {
  if (isAppointingLossPayee) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeForm;
