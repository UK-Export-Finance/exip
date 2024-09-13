/**
 * completeAndSubmitTradingHistoryWithBuyerForm
 * Complete and submit the "trading history with buyer" form
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 */
const completeAndSubmitTradingHistoryWithBuyerForm = ({ outstandingPayments = false }) => {
  cy.completeTradingHistoryWithBuyerForm({
    outstandingPayments,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitTradingHistoryWithBuyerForm;
