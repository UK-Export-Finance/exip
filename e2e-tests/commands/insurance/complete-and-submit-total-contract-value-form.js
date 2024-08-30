/**
 * completeAndSubmitTotalContractValueForm
 * Complete and submit the "Total contract value" form
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with a value over the MVP maximum amount
 * @param {String} totalContractValue: Total contract value
 * @param {String} requestedCreditLimit: Requested credit limit
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
