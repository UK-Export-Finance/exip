/**
 * submitAndAssertFieldErrors
 * Submit and assert errors for a field
 * @param {object} field: Cypress selector.
 * @param {string} value: The value to input - can be null.
 * @param {number} errorIndex: Index of error. Defaults to 0.
 * @param {number} expectedErrorsCount: Expected total amount of errors in the errors summary. Defaults to 1.
 * @param {number} expectedErrorMessage: Expected error message.
 * @param {number} expectedValue: Expected value after submission.
 * @param {boolean} assertExpectedValue: Assert an expected value. Defaults to true.
 * @param {boolean} clearInput: Clear the input before text entry. Defaults to true.
 * @param {boolean} keyboardInputViaValueAttribute: Flag for whether to input the text via the input's value attribute, instead of .type().
 */
const submitAndAssertFieldErrors = ({
  field,
  value,
  errorIndex = 0,
  expectedErrorsCount = 1,
  expectedErrorMessage,
  expectedValue,
  assertExpectedValue = true,
  clearInput = true,
  keyboardInputViaValueAttribute = false,
}) => {
  /**
   * If a value is provided,
   * Enter the value into the field's input.
   */
  if (value) {
    cy.keyboardInput(field.input(), value, keyboardInputViaValueAttribute);
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

  if (assertExpectedValue) {
    if (expectedValue) {
      cy.checkValue(field, expectedValue);
    } else if (value) {
      cy.checkValue(field, value);
    }
  }
};

export default submitAndAssertFieldErrors;
