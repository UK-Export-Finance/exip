import application from '../../fixtures/application';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = FIELD_IDS;

/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {Boolean} agentIsCharging: Agent is charging
 * @param {Boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum"
 * @param {String} agentChargeFixedSumAmount: Agent charge fixed sum amount
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
  agentChargeFixedSumAmount = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT],
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
        fixedSumAmount: agentChargeFixedSumAmount,
        percentageMethod: agentChargeMethodPercentage,
      });
    }
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeExportContractSection;
