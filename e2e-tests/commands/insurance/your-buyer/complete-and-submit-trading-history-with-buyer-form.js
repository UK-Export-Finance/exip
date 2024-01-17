/**
 * completeAndSubmitTradingHistoryWithBuyerForm
 * Complete and submit the "trading history with buyer" form
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 */
const completeAndSubmitTradingHistoryWithBuyerForm = ({ outstandingPayments = false, failedToPay = false }) => {
  cy.completeTradingHistoryWithBuyerForm({ outstandingPayments, failedToPay });

  cy.clickSubmitButton();
};

export default completeAndSubmitTradingHistoryWithBuyerForm;
