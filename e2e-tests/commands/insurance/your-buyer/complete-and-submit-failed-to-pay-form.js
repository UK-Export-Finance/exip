/**
 * completeAndSubmitFailedToPayForm
 * Complete and submit the "failed to pay" form
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 */
const completeAndSubmitFailedToPayForm = ({ failedToPay = false }) => {
  cy.completeFailedToPayForm({ failedToPay });

  cy.clickSubmitButton();
};

export default completeAndSubmitFailedToPayForm;
