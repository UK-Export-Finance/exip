/**
 * completeBuyerSection
 * Complete the "Buyer" section
 * @param {Boolean} viaTaskList: Start the "buyer" section from the task list.
 * @param {Boolean} exporterHasTradedWithBuyer: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} submitCheckYourAnswers: Click buyer "check your answers" submit button
 */
const completeBuyerSection = ({ viaTaskList = true, exporterHasTradedWithBuyer, submitCheckYourAnswers = false }) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionToTheBuyerForm({});
  cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer });
  cy.completeAndSubmitBuyerFinancialInformationForm({});

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeBuyerSection;
