import { MINIMUM_CHARACTERS } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

/**
 * percentageFieldValidation
 * Assert percentage field validation
 * @param {string} fieldId: Percentage field ID
 * @param {number} errorIndex: Index of the summary list error
 * @param {object} errorMessages: Percentage error messages
 * @param {number} totalExpectedErrors: Total expected errors in the form
 * @param {number} totalExpectedOtherErrorsWithValidPercentage: Total expected errors in the form when the percentage field is valid.
 * @param {boolean} minimum: Minimum allowed percentage.
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
  const field = fieldSelector(fieldId);

  const assertions = {
    field,
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  it(`should render validation errors when ${fieldId} percentage field is left empty`, () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: errorMessages.IS_EMPTY });
  });

  it(`should render validation errors when ${fieldId} percentage field is a decimal place number`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '5.5',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render validation errors when ${fieldId} percentage has a comma`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '4,4',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render validation errors when ${fieldId} percentage has special characters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '50!',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render validation errors when ${fieldId} percentage has letters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: 'one',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render validation errors when ${fieldId} percentage field is over 100`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '101',
      expectedErrorMessage: errorMessages.ABOVE_MAXIMUM,
    });
  });

  it(`should render validation errors when ${fieldId} percentage field is below ${minimum}`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: `${minimum - 1}`,
      expectedErrorMessage: errorMessages.BELOW_MINIMUM,
    });
  });

  it(`should NOT display validation errors when ${fieldId} percentage field is correctly entered as a whole number`, () => {
    cy.keyboardInput(field.input(), '5');

    cy.clickSubmitButton();

    cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPercentage);
  });

  it(`should NOT display validation errors when ${fieldId} percentage field is correctly entered as ${minimum}`, () => {
    cy.keyboardInput(field.input(), minimum);

    cy.clickSubmitButton();

    cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPercentage);
  });
};
