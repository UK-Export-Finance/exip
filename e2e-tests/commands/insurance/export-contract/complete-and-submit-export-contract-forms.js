/**
 * completeAndSubmitExportContractForms
 * completes export contract forms up to the specified form to stop at
 * eg, when 'aboutGoodsOrServices' is passed, it will complete all forms up to and including 'aboutGoodsOrServices'
 * @param {String} formToStopAt: the form to stop at
 * @param {Boolean} viaTaskList: Start the "export contract" section from the task list.
 * @param {Boolean} finalDestinationKnown: whether the final destination is known
 * @param {Boolean} totalContractValueOverThreshold: whether total contract value is over threshold
 * @param {Boolean} attemptedPrivateMarketCover: if attempted private market cover
 * @param {Boolean} isUsingAgent: if the exporter is using an agent
 * @param {Boolean} agentIsCharging: if the agent is charging
 * @param {Boolean} fixedSumMethod: if the agent is charging using fixed sum method
 */
const completeAndSubmitExportContractForms = ({
  formToStopAt,
  viaTaskList,
  finalDestinationKnown,
  totalContractValueOverThreshold,
  attemptedPrivateMarketCover,
  isUsingAgent,
  agentIsCharging,
  fixedSumMethod,
}) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  const steps = [
    {
      name: 'howWasTheContractAwarded',
      action: () => cy.completeAndSubmitHowWasTheContractAwardedForm({}),
    },
    { name: 'aboutGoodsOrServices', action: () => cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown }) },
    { name: 'howYouWillGetPaid', action: () => cy.completeAndSubmitHowYouWillGetPaidForm({}) },
  ];

  if (totalContractValueOverThreshold) {
    steps.push({ name: 'privateMarket', action: () => cy.completeAndSubmitPrivateMarketForm({ attemptedPrivateMarketCover }) });
  }

  steps.push({ name: 'agent', action: () => cy.completeAndSubmitAgentForm({ isUsingAgent }) });
  steps.push({ name: 'agentDetails', action: () => cy.completeAndSubmitAgentDetailsForm({}) });
  steps.push({ name: 'agentService', action: () => cy.completeAndSubmitAgentServiceForm({ agentIsCharging }) });
  steps.push({ name: 'agentCharges', action: () => cy.completeAgentChargesForm({ fixedSumMethod }) });

  /**
   * carries out steps in steps array
   * if the step name matches the form to stop at, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === formToStopAt) {
      break;
    }
  }
};

export default completeAndSubmitExportContractForms;
