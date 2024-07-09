import { INVALID_NAMES, VALID_NAMES } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

/**
 * assertNameFieldValidation
 * Assert name field validation
 * @param {String} fieldId: Name field ID
 * @param {Integer} errorIndex: Index of the summary list error
 * @param {Object} errorMessages: Email error messages
 * @param {Integer} totalExpectedErrors: Total expected errors in the form
 * @param {Integer} totalExpectedOtherErrorsWithName: Total expected errors in the form when name is valid.
 * @param {Boolean} shouldHaveOtherErrors: If other error messages should be present on the page if fieldId is valid.
 * @returns {Function} Mocha describe block with assertions.
 */
export const assertNameFieldValidation = ({
  fieldId,
  errorIndex,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithName = 0,
  shouldHaveOtherErrors = true,
}) => {
  const assertions = {
    field: fieldSelector(fieldId),
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  const otherErrors = () => {
    if (shouldHaveOtherErrors) {
      cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithName);
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

    it('should render a validation error the name contains special characters', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.SPECIAL_CHARACTERS,
        expectedErrorMessage: incorrectFormatErrorMessage,
      });
    });

    it('should render a validation error the name contains special characters and a space', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.SPECIAL_CHARACTERS_SPACE,
        expectedErrorMessage: incorrectFormatErrorMessage,
      });
    });

    it('should render a validation error the name contains numbers', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.NUMBERS,
        expectedErrorMessage: incorrectFormatErrorMessage,
      });
    });

    it('should render a validation error the name is above the maximum number of characters', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_NAMES.MAX_LENGTH,
        expectedErrorMessage: aboveMaximumErrorMessage,
      });
    });

    it(`should NOT render a validation error when ${fieldId} is correctly formatted as a single name`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_NAMES.SINGLE);

      cy.clickSubmitButton();

      otherErrors();
    });
  });
};

export default assertNameFieldValidation;
