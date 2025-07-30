/**
 * completeFailedToPayForm
 * Complete the "failed to pay" form
 * @param {boolean} failedToPay: Buyer has failed to pay the exporter on the time - defaults to false
 */
const completeFailedToPayForm = ({ failedToPay = false }) => {
  if (failedToPay) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeFailedToPayForm;
