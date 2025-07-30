/**
 * completeAndSubmitMultipleContractPolicyForm
 * Complete and submit the "multiple contract policy" form
 * @param {string} isoCode: Policy currency ISO code
 * @param {boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {boolean} chooseCurrency: Whether to choose a currency or not
 */
const completeAndSubmitMultipleContractPolicyForm = ({ isoCode, alternativeCurrency, chooseCurrency }) => {
  cy.completeMultipleContractPolicyForm({
    isoCode,
    alternativeCurrency,
    chooseCurrency,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitMultipleContractPolicyForm;
