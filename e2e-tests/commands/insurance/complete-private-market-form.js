/**
 * completePrivateMarketForm
 * Complete the "Tried to insure through the private market" form
 * @param {Boolean} attempted: Has attempted to insure through the private market. Defaults to false.
 */
const completePrivateMarketForm = ({ attempted = false }) => {
  if (attempted) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completePrivateMarketForm;
