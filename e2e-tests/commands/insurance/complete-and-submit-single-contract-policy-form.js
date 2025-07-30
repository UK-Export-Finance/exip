/**
 * completeAndSubmitSingleContractPolicyForm
 * Complete and submit the "single contract policy" form.
 * @param {string} isoCode: Policy currency ISO code
 * @param {boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {boolean} chooseCurrency: Whether to choose a currency or not
 */
const completeAndSubmitSingleContractPolicyForm = ({ isoCode, alternativeCurrency, chooseCurrency }) => {
  cy.completeSingleContractPolicyForm({
    isoCode,
    alternativeCurrency,
    chooseCurrency,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitSingleContractPolicyForm;
