/**
 * submitAndAssertFieldErrors
 * Submit and assert errors for a field
 * @param {String} field: Field selector
 * @param {String} fieldValue: The value to input - can be null
 * @param {Integer} errorIndex: Index of the summary list error
 * @param {Integer} errorSummaryLength: The number of expected errors in the summary list
 * @param {String} errorMessage: Expected error message
 * @param {Boolean} clearInput: Clear the input before text entry. Defaults to true
 */
const submitAndAssertFieldErrors = (field, fieldValue, errorIndex, errorSummaryLength, errorMessage, clearInput = true) => {
  /**
   * If a fieldValue is provided,
   * Enter the value into the field's input.
   */
  if (fieldValue) {
    cy.keyboardInput(field.input(), fieldValue);
  } else if (clearInput) {
    field.input().clear();
  }

  cy.clickSubmitButton();

  cy.assertFieldErrors({
    field,
    errorIndex,
    errorSummaryLength,
    errorMessage,
  });
};

export default submitAndAssertFieldErrors;
