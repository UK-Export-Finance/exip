/**
 * completeAndSubmitAgentChargesForm
 * Complete and submit the "Agent charges" form
 * @param {boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {boolean} percentageMethod: Method as "Percentage"
 * @param {string} percentageCharge: Percentage charge
 * @param {string} payableCountry: Payable country
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
