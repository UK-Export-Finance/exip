/**
 * completeAndSubmitSingleContractPolicyForm
 * Complete and submit the "single contract policy" form.
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {Boolean} chooseCurrency: Whether to choose a currency or not
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
