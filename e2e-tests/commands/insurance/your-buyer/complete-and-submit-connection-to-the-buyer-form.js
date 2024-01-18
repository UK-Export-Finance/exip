/**
 * completeAndSubmitConnectionToTheBuyerForm
 * Complete and submit the "connection to the buyer" form.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 * @param {String} description: "Connection with buyer" description.
 */
const completeAndSubmitConnectionToTheBuyerForm = ({ hasConnectionToBuyer = false, description }) => {
  cy.completeConnectionToTheBuyerForm({ hasConnectionToBuyer, description });

  cy.clickSubmitButton();
};

export default completeAndSubmitConnectionToTheBuyerForm;
