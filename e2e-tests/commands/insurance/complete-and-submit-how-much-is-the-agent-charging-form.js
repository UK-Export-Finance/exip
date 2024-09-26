/**
 * completeAndSubmitHowMuchIsTheAgentChargingForm
 * Complete and submit the "How much is the agent charging" form
 * @param {String} fixedSumAmount: Fixed sum amount
 */
const completeAndSubmitHowMuchIsTheAgentChargingForm = ({ fixedSumAmount }) => {
  cy.completeHowMuchIsTheAgentChargingForm({ fixedSumAmount });

  cy.clickSubmitButton();
};

export default completeAndSubmitHowMuchIsTheAgentChargingForm;
