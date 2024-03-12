/**
 * completeBuyerSection
 * Complete the "Buyer" section
 * @param {Boolean} viaTaskList: Start the "buyer" section from the task list.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 * @param {Boolean} exporterHasTradedWithBuyer: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} fullPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {Boolean} hasHadCreditInsuranceCover: Submit "yes" to if export "has held credit insurance cover on the buyer in the past"
 * @param {Boolean} exporterHasBuyerFinancialAccounts: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} submitCheckYourAnswers: Click buyer "check your answers" submit button.
 * @param {Boolean} totalContractValueOverThreshold: if total contract value in eligibility should be over threshold.
 */
const completeBuyerSection = ({
  viaTaskList = true,
  hasConnectionToBuyer = false,
  exporterHasTradedWithBuyer = false,
  fullPopulatedBuyerTradingHistory = false,
  hasHadCreditInsuranceCover = false,
  exporterHasBuyerFinancialAccounts = false,
  submitCheckYourAnswers = false,
  totalContractValueOverThreshold = false,
}) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer });
  cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer });

  if (exporterHasTradedWithBuyer) {
    cy.completeAndSubmitTradingHistoryWithBuyerForm({
      outstandingPayments: fullPopulatedBuyerTradingHistory,
      failedToPay: fullPopulatedBuyerTradingHistory,
    });
  }

  /**
   * if totalContractValueOverThreshold is true,
   * complete and submit credit insurance cover form
   */
  if (totalContractValueOverThreshold) {
    cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCover });
  }

  cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts });

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeBuyerSection;
