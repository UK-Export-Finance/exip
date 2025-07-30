import { MINIMUM_CHARACTERS } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

/**
 * monetaryFieldValidation
 * Assert monetary field validation
 * @param {string} fieldId: Monetary field ID
 * @param {number} errorIndex: Index of the summary list error
 * @param {object} errorMessages: Percentage error messages
 * @param {number} totalExpectedErrors: Total expected errors in the form
 * @param {number} totalExpectedOtherErrorsWithValidMonetaryValue: Total expected errors in the form when the monetary field is valid.
 * @param {boolean} minimum: Minimum allowed value.
 * @returns {Function} Mocha describe block with assertions.
 */
export const monetaryFieldValidation = ({
  fieldId,
  errorIndex = 0,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithValidMonetaryValue = 0,
  minimum = MINIMUM_CHARACTERS.ZERO,
}) => {
  const field = fieldSelector(fieldId);

  const assertions = {
    field,
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  it(`should render a validation error when ${fieldId} monetary field is left empty`, () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: errorMessages.IS_EMPTY });
  });

  it(`should render a validation error when ${fieldId} monetary field is not a number`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: 'Fifty',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render a validation error when ${fieldId} monetary field is not a whole number`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '123.456',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render a validation error when ${fieldId} monetary field contains a decimal`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '1.2',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render a validation error when ${fieldId} monetary field contains a comma and decimal`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '1,234.56',
      expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
    });
  });

  it(`should render a validation error when ${fieldId} monetary field is below the minimum`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: `${minimum - 1}`,
      expectedErrorMessage: errorMessages.BELOW_MINIMUM,
    });
  });

  it(`should NOT render a validation error when ${fieldId} monetary field is correctly entered with a comma`, () => {
    cy.keyboardInput(field.input(), '1,234');

    cy.clickSubmitButton();

    cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidMonetaryValue);
  });

  it(`should NOT render a validation error when ${fieldId} monetary field is correctly entered as ${minimum}`, () => {
    cy.keyboardInput(field.input(), minimum);

    cy.clickSubmitButton();

    cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidMonetaryValue);
  });
};
