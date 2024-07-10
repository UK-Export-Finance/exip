/**
 * completeAndSubmitTotalContractValueForm
 * Complete and submit the "Total contract value" form
 * @param {Object} Object with flags completing and submitting the form
 * - policyValueOverMvpMaximum: should submit an application with the value over the MVP maximum amount
 */
const completeAndSubmitTotalContractValueForm = ({ policyValueOverMvpMaximum = false }) => {
  cy.completeTotalContractValueForm({ policyValueOverMvpMaximum });

  cy.clickSubmitButton();
};

export default completeAndSubmitTotalContractValueForm;
