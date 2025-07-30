/**
 * completeBuyerFinancialInformationForm
 * Completes the "buyer financial information" form.
 * @param {object} Object with flags on how to complete the form.
 * - exporterHasBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to false.
 */
const completeBuyerFinancialInformationForm = ({ exporterHasBuyerFinancialAccounts = false }) => {
  if (exporterHasBuyerFinancialAccounts) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeBuyerFinancialInformationForm;
