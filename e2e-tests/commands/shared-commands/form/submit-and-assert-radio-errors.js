/**
 * @param {object} field: Cypress selector.
 * @param {number} errorIndex: Index of error. Defaults to 0.
 * @param {number} expectedErrorsCount: Expected total amount of errors in the errors summary. Defaults to 1.
 * @param {number} expectedErrorMessage: Expected error message.
 * @param {boolean} fieldShouldGainFocus: Input should gain focus after clicking the summary list error. Defaults to true
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
