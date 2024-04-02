/**
 * completeAndSubmitPrivateMarketForm
 * Complete and submit the "Tried to insure through the private market" form
 * @param {Boolean} attempted: Has attempted to insure through the private market
 */
const completeAndSubmitPrivateMarketForm = ({ attempted }) => {
  cy.completePrivateMarketForm({ attempted });

  cy.clickSubmitButton();
};

export default completeAndSubmitPrivateMarketForm;
