/**
 * completeAndSubmitHowMuchTheAgentIsChargingForm
 * Complete and submit the "How much the agent is charging" form
 * @param {String} fixedSumAmount: Fixed sum amount
 */
const completeAndSubmitHowMuchTheAgentIsChargingForm = ({ fixedSumAmount }) => {
  cy.completeHowMuchTheAgentIsChargingForm({ fixedSumAmount });

  cy.clickSubmitButton();
};

export default completeAndSubmitHowMuchTheAgentIsChargingForm;
