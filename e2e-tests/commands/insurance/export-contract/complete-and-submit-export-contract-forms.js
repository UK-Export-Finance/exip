/**
 * completeAndSubmitExportContractForms
 * completes export contract forms up to the specified form to stop at
 * eg, when 'aboutGoodsOrServices' is passed, it will complete all forms up to and including 'aboutGoodsOrServices'
 * @param {string} stopSubmittingAfter: The final form to submit
 * @param {boolean} viaTaskList: Start the "export contract" section from the task list.
 * @param {boolean} finalDestinationKnown: whether the final destination is known
 * @param {boolean} totalContractValueOverThreshold: whether total contract value is over threshold
 * @param {boolean} attemptedPrivateMarketCover: if attempted private market cover
 * @param {boolean} isUsingAgent: if the exporter is using an agent
 * @param {boolean} agentIsCharging: if the agent is charging
 * @param {boolean} fixedSumMethod: if the agent is charging using fixed sum method
 * @param {string} fixedSumAmount: Fixed sum amount
 */
const completeAndSubmitExportContractForms = ({
  stopSubmittingAfter,
  viaTaskList,
  finalDestinationKnown,
  totalContractValueOverThreshold,
  attemptedPrivateMarketCover,
  isUsingAgent,
  agentIsCharging,
  fixedSumMethod,
  fixedSumAmount,
}) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  const initialSteps = [
    {
      name: 'howWasTheContractAwarded',
      action: () => cy.completeAndSubmitHowWasTheContractAwardedForm({}),
    },
    { name: 'aboutGoodsOrServices', action: () => cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown }) },
    { name: 'howYouWillGetPaid', action: () => cy.completeAndSubmitHowYouWillGetPaidForm({}) },
  ];

  if (totalContractValueOverThreshold) {
    initialSteps.push({ name: 'privateMarket', action: () => cy.completeAndSubmitPrivateMarketForm({ attemptedPrivateMarketCover }) });
  }

  let steps = [
    ...initialSteps,
    { name: 'agent', action: () => cy.completeAndSubmitAgentForm({ isUsingAgent }) },
    { name: 'agentDetails', action: () => cy.completeAndSubmitAgentDetailsForm({}) },
    { name: 'agentService', action: () => cy.completeAndSubmitAgentServiceForm({ agentIsCharging }) },
    { name: 'agentCharges', action: () => cy.completeAndSubmitAgentChargesForm({ fixedSumMethod }) },
  ];

  if (fixedSumMethod) {
    steps = [
      ...steps,
      { name: 'currencyOfAgentCharges', action: () => cy.completeAndSubmitCurrencyForm({}) },
      { name: 'howMuchAgentIsCharging', action: () => cy.completeAndSubmitHowMuchTheAgentIsChargingForm({ fixedSumAmount }) },
    ];
  }

  /**
   * carries out steps in steps array
   * if the step name matches the form to stop at, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === stopSubmittingAfter) {
      break;
    }
  }
};

export default completeAndSubmitExportContractForms;
