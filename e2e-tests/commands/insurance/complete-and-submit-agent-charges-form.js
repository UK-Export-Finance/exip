/**
 * completeAndSubmitAgentChargesForm
 * Complete and submit the "Agent charges" form
 * @param {Boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {Boolean} percentageMethod: Method as "Percentage"
 * @param {String} fixedSumAmount: Fixed sum amount
 * @param {String} percentageCharge: Percentage charge
 * @param {String} payableCountry: Payable country
 */
const completeAndSubmitAgentChargesForm = ({
  fixedSumMethod,
  percentageMethod,
  fixedSumAmount,
  percentageCharge,
  payableCountry,
}) => {
  cy.completeAgentChargesForm({
    fixedSumMethod,
    percentageMethod,
    fixedSumAmount,
    percentageCharge,
    payableCountry,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentChargesForm;
