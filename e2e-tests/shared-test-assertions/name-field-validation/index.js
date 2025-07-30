import { INVALID_NAMES, VALID_NAMES } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

/**
 * assertNameFieldValidation
 * Assert name field validation
 * @param {string} fieldId: Name field ID
 * @param {string} maximum: name with over maximum number of characters
 * @param {number} errorIndex: Index of the summary list error
 * @param {object} errorMessages: Email error messages
 * @param {number} totalExpectedErrors: Total expected errors in the form
 * @param {number} totalExpectedOtherErrorsWithValidName: Total expected errors in the form when name is valid.
 * @param {boolean} shouldHaveOtherErrors: If other error messages should be present on the page if fieldId is valid.
 * @returns {Function} Mocha describe block with assertions.
 */
export const assertNameFieldValidation = ({
  fieldId,
  maximum,
  errorIndex,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithValidName = 0,
  shouldHaveOtherErrors = true,
}) => {
  const assertions = {
    field: fieldSelector(fieldId),
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  const otherErrors = () => {
    if (shouldHaveOtherErrors) {
      cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidName);
    } else {
      cy.assertErrorSummaryListDoesNotExist();
    }
  };

  const isEmptyErrorMessage = errorMessages.IS_EMPTY;
  const incorrectFormatErrorMessage = errorMessages.INCORRECT_FORMAT;
  const aboveMaximumErrorMessage = errorMessages.ABOVE_MAXIMUM;

  describe(`${fieldId} form field validation`, () => {
    it(`should render a validation error when ${fieldId} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: isEmptyErrorMessage });
    });

    it(`should render a validation error when ${fieldId} contains special characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.SPECIAL_CHARACTERS,
        expectedErrorMessage: incorrectFormatErrorMessage,
      });
    });

    it(`should render a validation error when ${fieldId} contains special characters and a space`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.SPECIAL_CHARACTERS_AND_SPACE,
        expectedErrorMessage: incorrectFormatErrorMessage,
      });
    });

    it(`should render a validation error when ${fieldId} contains numbers`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.NUMBERS,
        expectedErrorMessage: incorrectFormatErrorMessage,
      });
    });

    it(`should render a validation error when ${fieldId} is above the maximum number of characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: maximum,
        expectedErrorMessage: aboveMaximumErrorMessage,
      });
    });

    it(`should NOT render a validation error when ${fieldId} is correctly formatted as a string`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_NAMES.SINGLE);

      cy.clickSubmitButton();

      otherErrors();
    });

    it(`should NOT render a validation error when ${fieldId} is correctly formatted as a string with a space`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_NAMES.SPACE);

      cy.clickSubmitButton();

      otherErrors();
    });

    it(`should NOT render a validation error when ${fieldId} is correctly formatted with apostrophe`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_NAMES.APOSTROPHE);

      cy.clickSubmitButton();

      otherErrors();
    });

    it(`should NOT render a validation error when ${fieldId} is correctly formatted with a hyphen`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_NAMES.HYPHEN);

      cy.clickSubmitButton();

      otherErrors();
    });

    it(`should NOT render a validation error when ${fieldId} is correctly formatted with hyphens and apostrophies`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_NAMES.HYPHEN_AND_APOSTROPHE);

      cy.clickSubmitButton();

      otherErrors();
    });
  });
};

export default assertNameFieldValidation;
