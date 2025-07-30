/**
 * completeAndSubmitConnectionWithTheBuyerForm
 * Complete and submit the "connection with the buyer" form.
 * @param {boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to false.
 * @param {string} description: "Connection with buyer" description.
 */
const completeAndSubmitConnectionWithTheBuyerForm = ({ hasConnectionToBuyer = false, description }) => {
  cy.completeConnectionWithTheBuyerForm({ hasConnectionToBuyer, description });

  cy.clickSubmitButton();
};

export default completeAndSubmitConnectionWithTheBuyerForm;
