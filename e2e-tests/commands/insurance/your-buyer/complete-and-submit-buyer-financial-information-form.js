/**
 * completeAndBuyerFinancialInformationForm
 * Completes and submits the "buyer financial information" form.
 * @param {Object} Object with flags on how to complete the form.
 * - holdBuyerFinancialAccounts: Should submit "yes" to "buyer financial information" radio. Defaults to "no".
 */
const completeAndBuyerFinancialInformationForm = ({ holdBuyerFinancialAccounts = false }) => {
  cy.completeTradedWithBuyerForm({ holdBuyerFinancialAccounts });

  cy.clickSubmitButton();
};

export default completeAndBuyerFinancialInformationForm;
