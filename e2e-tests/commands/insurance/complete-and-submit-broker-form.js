/**
 * completeAndSubmitBrokerForm
 * Complete and submit "using broker" form
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to false.
 */
const completeAndSubmitBrokerForm = ({ usingBroker = false }) => {
  if (usingBroker) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerForm;
