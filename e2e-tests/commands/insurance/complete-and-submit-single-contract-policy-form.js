/**
 * completeAndSubmitSingleContractPolicyForm
 * Complete and submit the "single contract policy" form.
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 */
const completeAndSubmitSingleContractPolicyForm = ({
  isoCode,
  alternativeCurrency,
}) => {
  cy.completeSingleContractPolicyForm({
    isoCode,
    alternativeCurrency,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitSingleContractPolicyForm;
