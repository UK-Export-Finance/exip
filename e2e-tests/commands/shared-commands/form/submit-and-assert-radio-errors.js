/**
 * @param {Object} field: Cypress selector.
 * @param {Number} errorIndex: Index of error. Defaults to 0.
 * @param {Number} expectedErrorsCount: Expected total amount of errors in the errors summary. Defaults to 1.
 * @param {Number} expectedErrorMessage: Expected error message.
 * @param {Boolean} fieldShouldGainFocus: Input should gain focus after clicking the summary list error. Defaults to true
 */
const submitAndAssertRadioErrors = ({ field, errorIndex = 0, expectedErrorsCount = 1, expectedErrorMessage, fieldShouldGainFocus = true }) => {
  cy.clickSubmitButton();

  cy.assertFieldErrors({
    field,
    errorIndex,
    errorSummaryLength: expectedErrorsCount,
    errorMessage: expectedErrorMessage,
    fieldShouldGainFocus,
  });
};

export default submitAndAssertRadioErrors;
