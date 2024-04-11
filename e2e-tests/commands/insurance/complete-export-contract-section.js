/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {Boolean} viaTaskList: Start the "export contract" section from the task list.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} attemptedPrivateMarketCover: Has attempted to insure through the private market
 * @param {Boolean} isUsingAgent: Exporter is using an agent
 * @param {Boolean} submitCheckYourAnswers: Click export contract "check your answers" submit button
 */
const completeExportContractSection = ({
  viaTaskList,
  totalContractValueOverThreshold,
  attemptedPrivateMarketCover = false,
  isUsingAgent = false,
  submitCheckYourAnswers = false,
}) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  cy.completeAndSubmitAboutGoodsOrServicesForm({});
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
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeExportContractSection;
