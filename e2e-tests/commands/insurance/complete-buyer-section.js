/**
 * completeBuyerSection
 * Complete the "Buyer" section
 * @param {Boolean} viaTaskList: Start the "buyer" section from the task list.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 * @param {Boolean} exporterHasTradedWithBuyer: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 * @param {Boolean} fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {Boolean} hasHadCreditInsuranceCoverWithBuyer: Submit "yes" to if export "has held credit insurance cover on the buyer in the past"
 * @param {Boolean} exporterHasBuyerFinancialAccounts: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} submitCheckYourAnswers: Click buyer "check your answers" submit button.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 */
const completeBuyerSection = ({
  viaTaskList = true,
  hasConnectionToBuyer = false,
  exporterHasTradedWithBuyer = false,
  outstandingPayments = false,
  failedToPay = false,
  fullyPopulatedBuyerTradingHistory = false,
  hasHadCreditInsuranceCoverWithBuyer = false,
  exporterHasBuyerFinancialAccounts = false,
  submitCheckYourAnswers = false,
  totalContractValueOverThreshold = false,
}) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer });
  cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer });

  if (exporterHasTradedWithBuyer) {
    cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: outstandingPayments || fullyPopulatedBuyerTradingHistory });

    if (outstandingPayments || fullyPopulatedBuyerTradingHistory) {
      cy.completeAndSubmitAlternativeCurrencyForm({ clickAlternativeCurrencyLink: false });
      cy.completeAndSubmitOutstandingOrOverduePaymentsForm({ outstandingPayments });
    }

    cy.completeAndSubmitFailedToPayForm({ failedToPay });
  }

  /**
   * if totalContractValueOverThreshold is true,
   * complete and submit credit insurance cover form
   */
  if (totalContractValueOverThreshold) {
    cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWithBuyer });
  }

  cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts });

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeBuyerSection;
