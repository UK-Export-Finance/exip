/**
 * completeAndSubmitTotalContractValueForm
 * Complete and submit the "Total contract value" form
 * @param {boolean} policyValueOverMvpMaximum: Should submit an application with a value over the MVP maximum amount
 * @param {string} totalContractValue: Total contract value
 * @param {string} requestedCreditLimit: Requested credit limit
 */
const completeAndSubmitTotalContractValueForm = ({ policyValueOverMvpMaximum, totalContractValue, requestedCreditLimit }) => {
  cy.completeTotalContractValueForm({
    policyValueOverMvpMaximum,
    totalContractValue,
    requestedCreditLimit,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitTotalContractValueForm;
