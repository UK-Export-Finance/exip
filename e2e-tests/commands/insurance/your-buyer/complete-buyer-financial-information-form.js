/**
 * completeBuyerFinancialInformationForm
 * Completes the "buyer financial information" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to "no".
 */
const completeBuyerFinancialInformationForm = ({ exporterHasBuyerFinancialAccounts = false }) => {
  if (exporterHasBuyerFinancialAccounts) {
    cy.clickYesRadioInput(0);
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeBuyerFinancialInformationForm;
