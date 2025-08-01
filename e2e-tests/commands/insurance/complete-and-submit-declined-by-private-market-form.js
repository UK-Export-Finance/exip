/**
 * completeAndSubmitDeclinedByPrivateMarketForm
 * Complete and submit the "Why were you declined by the private market" form
 * @param {string} declinedDescription: Description value
 */
const completeAndSubmitDeclinedByPrivateMarketForm = ({ declinedDescription }) => {
  cy.completeDeclinedByPrivateMarketForm({ declinedDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitDeclinedByPrivateMarketForm;
