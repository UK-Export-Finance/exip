/**
 * completeAndSubmitAgentChargesForm
 * Complete and submit the "Agent charges" form
 * @param {Boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {Boolean} percentageMethod: Method as "Percentage"
 * @param {String} percentageCharge: Percentage charge
 * @param {String} payableCountry: Payable country
 */
const completeAndSubmitAgentChargesForm = ({ fixedSumMethod, percentageMethod, percentageCharge, payableCountry }) => {
  cy.completeAgentChargesForm({
    fixedSumMethod,
    percentageMethod,
    percentageCharge,
    payableCountry,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentChargesForm;
