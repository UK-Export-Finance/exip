import { MINIMUM_CHARACTERS } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

/**
 * percentageFieldValidation
 * Assert percentage field validation
 * @param {String} fieldId: Percentage field ID
 * @param {Integer} errorIndex: Index of the summary list error
 * @param {Object} errorMessages: Percentage error messages
 * @param {Integer} totalExpectedErrors: Total expected errors in the form
 * @param {Integer} totalExpectedOtherErrorsWithValidPercentage: Total expected errors in the form when a percentage is valid.
 * @param {Boolean} minimum: Minimum allowed percentage.
 * @returns {Function} Mocha describe block with assertions.
 */
export const percentageFieldValidation = ({
  fieldId,
  errorIndex = 0,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithValidPercentage = 0,
  minimum = MINIMUM_CHARACTERS.ZERO,
}) => {
  const assertions = {
    field: fieldSelector(fieldId),
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  it('should display validation errors when percentage is left empty', () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: errorMessages.IS_EMPTY });
  });

  it('should display validation errors when percentage is a decimal place number', () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '5.5',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it('should display validation errors when percentage has a comma', () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '4,4',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it('should display validation errors when percentage has special characters', () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '50!',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it('should display validation errors when percentage is over 100', () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '101',
      expectedErrorMessage: errorMessages.ABOVE_MAXIMUM,
    });
  });

  it(`should display validation errors when percentage is below ${minimum}`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: `${minimum - 1}`,
      expectedErrorMessage: errorMessages.BELOW_MINIMUM,
    });
  });

  it(`should NOT display validation errors when ${fieldId} is correctly entered as a whole number`, () => {
    const field = fieldSelector(fieldId);

    cy.keyboardInput(field.input(), '5');

    cy.clickSubmitButton();

    cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPercentage);
  });

  it(`should NOT display validation errors when ${fieldId} is correctly entered as ${minimum}`, () => {
    const field = fieldSelector(fieldId);

    cy.keyboardInput(field.input(), minimum);

    cy.clickSubmitButton();

    cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPercentage);
  });
};
