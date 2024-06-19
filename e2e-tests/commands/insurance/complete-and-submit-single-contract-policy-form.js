/**
 * completeAndSubmitSingleContractPolicyForm
 * Complete and submit the "single contract policy" form.
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrencyPolicy: Select the "alternative currency" option
 */
const completeAndSubmitSingleContractPolicyForm = ({ isoCode, alternativeCurrencyPolicy }) => {
  cy.completeSingleContractPolicyForm({
    isoCode,
    alternativeCurrencyPolicy,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitSingleContractPolicyForm;
