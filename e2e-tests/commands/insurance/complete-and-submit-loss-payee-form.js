/**
 * completeAndSubmitLossPayeeForm
 * Complete and submit "loss payee" form
 * @param {Boolean} appointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to "no".
 */
const completeAndSubmitLossPayeeForm = ({
  appointingLossPayee = false,
}) => {
  if (appointingLossPayee) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitLossPayeeForm;
