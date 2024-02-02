/**
 * completeAndSubmitBuyerFinancialInformationForm
 * Completes and submits the "buyer financial information" form.
 * @param {Object} Object with flags on how to complete the form.
 * - holdexporterHasBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to "no".
 */
const completeAndSubmitBuyerFinancialInformationForm = ({ holdexporterHasBuyerFinancialAccounts = false }) => {
  cy.completeTradedWithBuyerForm({ holdexporterHasBuyerFinancialAccounts });

  cy.clickSubmitButton();
};

export default completeAndSubmitBuyerFinancialInformationForm;
