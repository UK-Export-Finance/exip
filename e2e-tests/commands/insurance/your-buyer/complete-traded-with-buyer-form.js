/**
 * completeTradedWithBuyerForm
 * Completes the "traded with buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "traded with buyer" radio. Defaults to false.
 */
const completeTradedWithBuyerForm = ({ exporterHasTradedWithBuyer = false }) => {
  if (exporterHasTradedWithBuyer) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeTradedWithBuyerForm;
