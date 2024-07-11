/**
 * completeAndSubmitPrivateMarketForm
 * Complete and submit the "Tried to insure through the private market" form
 * @param {Boolean} attemptedPrivateMarketCover: Has attempted to insure through the private market
 */
const completeAndSubmitPrivateMarketForm = ({ attemptedPrivateMarketCover }) => {
  cy.completePrivateMarketForm({ attemptedPrivateMarketCover });

  cy.clickSubmitButton();
};

export default completeAndSubmitPrivateMarketForm;
