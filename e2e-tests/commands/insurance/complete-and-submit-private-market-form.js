/**
 * completeAndSubmitPrivateMarketForm
 * Complete and submit the "Tried to insure through the private market" form
 * @param {Boolean} attempted: Has attempted to insure through the private market
 */
const completeAndSubmitPrivateMarketForm = ({ attempted = false }) => {
  if (attempted) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitPrivateMarketForm;
