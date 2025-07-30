/**
 * completeAndSubmitAllLossPayeeFormsViaChangeYourAnswers
 * Complete and submit all "loss payee" forms, with a loss payee assigned,
 * via a "change your answers" user flow.
 * @param {string} checkYourAnswersRoute: "Check your answers" route
 * @param {string} fieldId: Field ID that has been clicked from the "Check your answers" page.
 * @param {boolean} locatedInUK: if located in UK radio should be selected
 * @param {string} lossPayeeDetailsUrl: "Loss payee details" URL
 * @param {string} lossPayeeFinancialUkUrl: "Loss payee financial details UK" URL
 * @param {string} lossPayeeFinancialInternationalUrl: "Loss payee financial details international" URL
 * @param {string} referenceNumber: Application reference number
 */
const completeAndSubmitAllLossPayeeFormsViaChangeYourAnswers = ({
  checkYourAnswersRoute,
  fieldId,
  locatedInUK = false,
  lossPayeeDetailsUrl,
  lossPayeeFinancialUkUrl,
  lossPayeeFinancialInternationalUrl,
  referenceNumber,
}) => {
  cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee: true });
  cy.assertUrl(`${lossPayeeDetailsUrl}#${fieldId}-label`);

  cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK });

  if (locatedInUK) {
    cy.assertUrl(`${lossPayeeFinancialUkUrl}#${fieldId}-label`);

    cy.completeAndSubmitLossPayeeFinancialDetailsUkForm({});
  } else {
    cy.assertUrl(`${lossPayeeFinancialInternationalUrl}#${fieldId}-label`);

    cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({});
  }

  cy.assertChangeAnswersPageUrl({ referenceNumber, route: checkYourAnswersRoute, fieldId });
};

export default completeAndSubmitAllLossPayeeFormsViaChangeYourAnswers;
