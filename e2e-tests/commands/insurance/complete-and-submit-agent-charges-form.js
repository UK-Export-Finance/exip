/**
 * completeAndSubmitAgentChargesForm
 * Complete and submit the "Agent charges" form
 * @param {Boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {Boolean} percentageMethod: Method as "Percentage"
 * @param {String} fixedSumAmount: Fixed sum amount
 * @param {String} chargePercentage: Charge percentage
 * @param {String} payableCountry: Payable country
 */
const completeAndSubmitAgentChargesForm = ({
  fixedSumMethod,
  percentageMethod,
  fixedSumAmount,
  chargePercentage,
  payableCountry,
}) => {
  cy.completeAgentChargesForm({
    fixedSumMethod,
    percentageMethod,
    fixedSumAmount,
    chargePercentage,
    payableCountry,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentChargesForm;
