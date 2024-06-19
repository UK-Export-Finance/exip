/**
 * completeBusinessSection
 * Complete the "business" section
 * @param {Boolean} viaTaskList: Start the "business" section from the task list.
 * @param {Boolean} differentTradingName: Should submit "yes" to "have a different trading name" in the "company details" form.
 * @param {Boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {Boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form.
 * @param {Boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 * @param {Boolean} alternativeCurrencyTurnover: Select the "alternative currency" option
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
  cy.completeAndSubmitTurnoverForm({ alternativeCurrencyTurnover });
  cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess });

  if (submitCheckYourAnswers) {
    cy.clickSaveAndBackButton();
  }
};

export default completeBusinessSection;
