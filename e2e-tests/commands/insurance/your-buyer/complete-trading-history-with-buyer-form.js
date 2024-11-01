/**
 * completeTradingHistoryWithBuyerForm
 * Complete the "trading history with buyer" form
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 */
const completeTradingHistoryWithBuyerForm = ({ outstandingPayments = false }) => {
  if (outstandingPayments) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeTradingHistoryWithBuyerForm;
