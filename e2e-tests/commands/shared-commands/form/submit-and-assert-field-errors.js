/**
 * submitAndAssertFieldErrors
 * Submit and assert errors for a field
 * @param {Object} field: Cypress selector.
 * @param {String} value: The value to input - can be null.
 * @param {Number} errorIndex: Index of error. Defaults to 0.
 * @param {Number} expectedErrorsCount: Expected total amount of errors in the errors summary. Defaults to 1.
 * @param {Number} expectedErrorMessage: Expected error message.
 * @param {Boolean} clearInput: Clear the input before text entry. Defaults to true.
 */
const submitAndAssertFieldErrors = ({
  field,
  value,
  errorIndex = 0,
  expectedErrorsCount = 1,
  expectedErrorMessage,
  clearInput = true,
}) => {
  /**
   * If a value is provided,
   * Enter the value into the field's input.
   */
  if (value) {
    cy.keyboardInput(field.input(), value);
  } else if (clearInput) {
    field.input().clear();
  }

  cy.clickSubmitButton();

  cy.assertFieldErrors({
    field,
    errorIndex,
    errorSummaryLength: expectedErrorsCount,
    errorMessage: expectedErrorMessage,
  });
};

export default submitAndAssertFieldErrors;
