/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {Boolean} agentIsCharging: Agent is charging
 * @param {Boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum"
 * @param {Boolean} agentChargeMethodPercentage: Agent charge method is "percentage"
 * @param {Boolean} attemptedPrivateMarketCover: Has attempted to insure through the private market
 * @param {Boolean} finalDestinationKnown: "Final destination known"
 * @param {Boolean} isUsingAgent: Exporter is using an agent
 * @param {Boolean} submitCheckYourAnswers: Click export contract "check your answers" submit button
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} viaTaskList: Start the "export contract" section from the task list.
 */
const completeExportContractSection = ({
  agentIsCharging = false,
  agentChargeMethodFixedSum = false,
  agentChargeMethodPercentage = false,
  attemptedPrivateMarketCover = false,
  finalDestinationKnown,
  isUsingAgent = false,
  submitCheckYourAnswers = false,
  totalContractValueOverThreshold,
  viaTaskList,
}) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown });
  cy.completeAndSubmitHowYouWillGetPaidForm({});

  if (totalContractValueOverThreshold) {
    cy.completeAndSubmitPrivateMarketForm({ attemptedPrivateMarketCover });

    if (attemptedPrivateMarketCover) {
      cy.completeAndSubmitDeclinedByPrivateMarketForm({});
    }
  }

  cy.completeAndSubmitAgentForm({ isUsingAgent });

  if (isUsingAgent) {
    cy.completeAndSubmitAgentDetailsForm({});

    cy.completeAndSubmitAgentServiceForm({ agentIsCharging });

    if (agentIsCharging) {
      cy.completeAndSubmitAgentChargesForm({
        fixedSumMethod: agentChargeMethodFixedSum,
        percentageMethod: agentChargeMethodPercentage,
      });
    }
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeExportContractSection;
