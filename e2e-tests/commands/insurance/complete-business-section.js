/**
 * completeBusinessSection
 * Complete the "business" section
 * @param {Boolean} viaTaskList: Start the "business" section from the task list.
 * @param {Boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {Boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form.
 * @param {Boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 */
const completeBusinessSection = ({
  viaTaskList,
  differentTradingAddress = false,
  hasCreditControlProcess = false,
  submitCheckYourAnswers = false,
}) => {
  cy.startYourBusinessSection({ viaTaskList });

  cy.completeAndSubmitCompanyDetails({ differentTradingAddress });

  if (differentTradingAddress) {
    cy.completeAndSubmitAlternativeTradingAddressForm({});
  }

  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess });

  if (submitCheckYourAnswers) {
    cy.clickSaveAndBackButton();
  }
};

export default completeBusinessSection;
