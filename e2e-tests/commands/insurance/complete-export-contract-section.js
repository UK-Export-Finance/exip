/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {boolean} agentIsCharging: Agent is charging
 * @param {boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum"
 * @param {string} agentChargeFixedSumAmount: Agent charge fixed sum amount
 * @param {boolean} agentChargeMethodPercentage: Agent charge method is "percentage"
 * @param {boolean} alternativeCurrency: Should submit an "alternative currency". Defaults to false.
 * @param {boolean} attemptedPrivateMarketCover: Has attempted to insure through the private market
 * @param {boolean} contractAwardedCompetitiveBidding: "How was the contract awarded" method as COMPETITIVE_BIDDING
 * @param {boolean} contractAwardedDirectAward: "How was the contract awarded" method as DIRECT_AWARD
 * @param {boolean} contractAwardedNegotiatedContract: "How was the contract awarded" method as NEGOTIATED_CONTRACT
 * @param {boolean} contractAwardedOpenTender: "How was the contract awarded" method as OPEN_TENDER
 * @param {boolean} contractAwardedOtherMethod: "How was the contract awarded" method as OTHER
 * @param {boolean} finalDestinationKnown: "Final destination known"
 * @param {boolean} isUsingAgent: Exporter is using an agent
 * @param {boolean} submitCheckYourAnswers: Click export contract "check your answers" submit button
 * @param {boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {boolean} viaTaskList: Start the "export contract" section from the task list.
 */
const completeExportContractSection = ({
  agentIsCharging = false,
  agentChargeMethodFixedSum = false,
  agentChargeFixedSumAmount,
  agentChargeMethodPercentage = false,
  alternativeCurrency = false,
  attemptedPrivateMarketCover = false,
  contractAwardedCompetitiveBidding = false,
  contractAwardedDirectAward = false,
  contractAwardedNegotiatedContract = false,
  contractAwardedOpenTender = true,
  contractAwardedOtherMethod = false,
  finalDestinationKnown,
  isUsingAgent = false,
  submitCheckYourAnswers = false,
  totalContractValueOverThreshold,
  viaTaskList,
}) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  cy.completeAndSubmitHowWasTheContractAwardedForm({
    openTender: contractAwardedOpenTender,
    negotiatedContract: contractAwardedNegotiatedContract,
    directAward: contractAwardedDirectAward,
    competitiveBidding: contractAwardedCompetitiveBidding,
    otherMethod: contractAwardedOtherMethod,
  });

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

      if (agentChargeMethodFixedSum) {
        cy.completeAndSubmitCurrencyForm({ alternativeCurrency });

        cy.completeAndSubmitHowMuchTheAgentIsChargingForm({
          fixedSumAmount: agentChargeFixedSumAmount,
        });
      }
    }
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeExportContractSection;
