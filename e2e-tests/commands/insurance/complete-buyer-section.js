/**
 * completeBuyerSection
 * Complete the "Buyer" section
 * @param {Boolean} viaTaskList: Start the "buyer" section from the task list.
 * @param {Boolean} exporterHasTradedWithBuyer: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} submitCheckYourAnswers: Click buyer "check your answers" submit button
 * @param {Boolean} totalContractValueOverThreshold: if total contract value in eligibility should be over threshold
 */
const completeBuyerSection = ({
  viaTaskList = true, exporterHasTradedWithBuyer, submitCheckYourAnswers = false, totalContractValueOverThreshold = false,
}) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionToTheBuyerForm({});
  cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer });

  /**
   * if not exporterHasTradedWithBuyer
   * and totalContractValueOverThreshold is true
   * then complete credit insurance cover form
   */
  if (totalContractValueOverThreshold && !exporterHasTradedWithBuyer) {
    cy.completeAndSubmitCreditInsuranceCoverForm({});
  }

  cy.completeAndSubmitBuyerFinancialInformationForm({});

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeBuyerSection;
