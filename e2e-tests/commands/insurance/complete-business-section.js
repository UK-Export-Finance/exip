/**
 * completeBusinessSection
 * Complete the "business" section
 * @param {boolean} viaTaskList: Start the "business" section from the task list.
 * @param {boolean} differentTradingName: Should submit "yes" to "have a different trading name" in the "company details" form.
 * @param {boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form.
 * @param {boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 * @param {boolean} alternativeCurrencyTurnover: Select the "alternative currency" option
 */
const completeBusinessSection = ({
  viaTaskList,
  differentTradingName = false,
  differentTradingAddress = false,
  hasCreditControlProcess = false,
  submitCheckYourAnswers = false,
  alternativeCurrencyTurnover = false,
}) => {
  cy.startYourBusinessSection({ viaTaskList });

  cy.completeAndSubmitCompanyDetails({ differentTradingName, differentTradingAddress });

  if (differentTradingAddress) {
    cy.completeAndSubmitAlternativeTradingAddressForm({});
  }

  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitCurrencyForm({ alternativeCurrency: alternativeCurrencyTurnover });
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess });

  if (submitCheckYourAnswers) {
    cy.clickSaveAndBackButton();
  }
};

export default completeBusinessSection;
