/**
 * completeAndSubmitMultipleContractPolicyForm
 * Complete and submit the "multiple contract policy" form
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 */
const completeAndSubmitMultipleContractPolicyForm = ({ isoCode, alternativeCurrency }) => {
  cy.completeMultipleContractPolicyForm({
    isoCode,
    alternativeCurrency,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitMultipleContractPolicyForm;
