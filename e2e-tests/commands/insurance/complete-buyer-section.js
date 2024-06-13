/**
 * completeBuyerSection
 * Complete the "Buyer" section
 * @param {Boolean} viaTaskList: Start the "buyer" section from the task list.
 * @param {Boolean} alternativeCurrency: Should submit an "alternative currency". Defaults to false.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 * @param {Boolean} exporterHasTradedWithBuyer: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} outstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: Buyer has failed to pay the exporter on the time
 * @param {Boolean} fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {Boolean} hasHadCreditInsuranceCoverWIthBuyer: Submit "yes" to if export "has held credit insurance cover on the buyer in the past"
 * @param {Boolean} exporterHasBuyerFinancialAccounts: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} submitCheckYourAnswers: Click buyer "check your answers" submit button.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 */
const completeBuyerSection = ({
  viaTaskList = true,
  alternativeCurrency = false,
  hasConnectionToBuyer = false,
  exporterHasTradedWithBuyer = false,
  outstandingPayments = false,
  failedToPay = false,
  fullyPopulatedBuyerTradingHistory = false,
  hasHadCreditInsuranceCoverWIthBuyer = false,
  exporterHasBuyerFinancialAccounts = false,
  submitCheckYourAnswers = false,
  totalContractValueOverThreshold = false,
}) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer });
  cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer });

  if (exporterHasTradedWithBuyer) {
    cy.clickYesRadioInput();

    if (alternativeCurrency) {
      cy.clickProvideAlternativeCurrencyLink();

      cy.clickAlternativeCurrencyRadioAndSubmitCurrency({});
    }

    cy.completeAndSubmitTradingHistoryWithBuyerForm({
      outstandingPayments: outstandingPayments || fullyPopulatedBuyerTradingHistory,
      failedToPay: failedToPay || fullyPopulatedBuyerTradingHistory,
    });
  }

  /**
   * if totalContractValueOverThreshold is true,
   * complete and submit credit insurance cover form
   */
  if (totalContractValueOverThreshold) {
    cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWIthBuyer });
  }

  cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts });

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completeBuyerSection;
