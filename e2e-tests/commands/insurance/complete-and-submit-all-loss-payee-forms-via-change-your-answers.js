/**
 * completeAndSubmitAllLossPayeeFormsViaChangeYourAnswers
 * Complete and submit all "loss payee" forms, with a loss payee assigned,
 * via a "change your answers" user flow.
 * @param {String} checkYourAnswersRoute: "Check your answers" route
 * @param {String} fieldId: Field ID that has been clicked from the "Check your answers" page.
 * @param {Boolean} locatedInUK: if located in UK radio should be selected
 * @param {String} lossPayeeDetailsUrl: "Loss payee details" URL
 * @param {String} lossPayeeFinancialUkUrl: "Loss payee financial details UK" URL
 * @param {String} lossPayeeFinancialInternationalUrl: "Loss payee financial details international" URL
 * @param {String} referenceNumber: Application reference number
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
