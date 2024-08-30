/**
 * completeAndSubmitTotalContractValueForm
 * Complete and submit the "Total contract value" form
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with a value over the MVP maximum amount
 * @param {String} totalContractValue: Total contract value
 * @param {String} creditLimit: Credit limit
 */
const completeAndSubmitTotalContractValueForm = ({ policyValueOverMvpMaximum, totalContractValue, creditLimit }) => {
  cy.completeTotalContractValueForm({
    policyValueOverMvpMaximum,
    totalContractValue,
    creditLimit,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitTotalContractValueForm;
