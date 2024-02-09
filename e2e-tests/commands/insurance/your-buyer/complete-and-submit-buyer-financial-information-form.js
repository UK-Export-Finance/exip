/**
 * completeAndSubmitBuyerFinancialInformationForm
 * Completes and submits the "buyer financial information" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to "no".
 */
const completeAndSubmitBuyerFinancialInformationForm = ({ exporterHasBuyerFinancialAccounts = false }) => {
  cy.completeBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts });

  cy.clickSubmitButton();
};

export default completeAndSubmitBuyerFinancialInformationForm;
