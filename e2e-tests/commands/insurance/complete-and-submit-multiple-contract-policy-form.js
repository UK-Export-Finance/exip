/**
 * completeAndSubmitMultipleContractPolicyForm
 * Complete and submit the "multiple contract policy" form
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {Boolean} chooseCurrency: Whether to choose a currency or not
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
