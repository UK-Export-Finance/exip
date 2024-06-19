/**
 * completeAndSubmitMultipleContractPolicyForm
 * Complete and submit the "multiple contract policy" form
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrencyPolicy: Select the "alternative currency" option
 */
const completeAndSubmitMultipleContractPolicyForm = ({ isoCode, alternativeCurrencyPolicy }) => {
  cy.completeMultipleContractPolicyForm({
    isoCode,
    alternativeCurrencyPolicy,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitMultipleContractPolicyForm;
