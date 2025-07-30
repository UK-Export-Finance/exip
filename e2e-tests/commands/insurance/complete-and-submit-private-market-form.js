/**
 * completeAndSubmitPrivateMarketForm
 * Complete and submit the "Tried to insure through the private market" form
 * @param {boolean} attemptedPrivateMarketCover: Has attempted to insure through the private market
 */
const completeAndSubmitPrivateMarketForm = ({ attemptedPrivateMarketCover }) => {
  cy.completePrivateMarketForm({ attemptedPrivateMarketCover });

  cy.clickSubmitButton();
};

export default completeAndSubmitPrivateMarketForm;
