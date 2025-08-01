/**
 * completeAndSubmitBuyerFinancialInformationForm
 * Completes and submits the "buyer financial information" form.
 * @param {object} Object with flags on how to complete the form.
 * - exporterHasBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to false.
 */
const completeAndSubmitBuyerFinancialInformationForm = ({ exporterHasBuyerFinancialAccounts = false }) => {
  cy.completeBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts });

  cy.clickSubmitButton();
};

export default completeAndSubmitBuyerFinancialInformationForm;
