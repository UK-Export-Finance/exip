/**
 * completeAndSubmitConnectionWithTheBuyerForm
 * Complete and submit the "connection with the buyer" form.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 * @param {String} description: "Connection with buyer" description.
 */
const completeAndSubmitConnectionWithTheBuyerForm = ({ hasConnectionToBuyer = false, description }) => {
  cy.completeConnectionWithTheBuyerForm({ hasConnectionToBuyer, description });

  cy.clickSubmitButton();
};

export default completeAndSubmitConnectionWithTheBuyerForm;
