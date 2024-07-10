/**
 * completePrivateMarketForm
 * Complete the "Tried to insure through the private market" form
 * @param {Boolean} attemptedPrivateMarketCover: Has attempted to insure through the private market. Defaults to false.
 */
const completePrivateMarketForm = ({ attemptedPrivateMarketCover = false }) => {
  if (attemptedPrivateMarketCover) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completePrivateMarketForm;
