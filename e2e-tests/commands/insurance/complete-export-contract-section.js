/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {Boolean} viaTaskList: Start the "export contract" section from the task list.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} submitCheckYourAnswers: Click export contract "check your answers" submit button
 */
const completeExportContractSection = ({
  viaTaskList,
  totalContractValueOverThreshold,
  submitCheckYourAnswers = false,
}) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  cy.completeAndSubmitAboutGoodsOrServicesForm({});
  cy.completeAndSubmitHowYouWillGetPaidForm({});

  if (totalContractValueOverThreshold) {
    cy.completeAndSubmitPrivateMarketForm({});
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeExportContractSection;
