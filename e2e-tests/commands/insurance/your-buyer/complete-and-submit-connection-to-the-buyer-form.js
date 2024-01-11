/**
 * completeAndSubmitConnectionToTheBuyerForm
 * Completes and submits the "connection to the buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 */
const completeAndSubmitConnectionToTheBuyerForm = ({ hasConnectionToBuyer = false }) => {
  cy.completeConnectionToTheBuyerForm({ hasConnectionToBuyer });

  cy.clickSubmitButton();
};

export default completeAndSubmitConnectionToTheBuyerForm;
