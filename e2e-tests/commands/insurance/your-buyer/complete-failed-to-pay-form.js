/**
 * completeFailedToPayForm
 * Complete the "failed to pay" form
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 */
const completeFailedToPayForm = ({ failedToPay = false }) => {
  if (failedToPay) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeFailedToPayForm;
