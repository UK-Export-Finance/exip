import { INVALID_EMAILS, VALID_EMAIL } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

/**
 * assertEmailFieldValidation
 * Assert email field validation
 * @param {string} fieldId: Email field ID
 * @param {number} errorIndex: Index of the summary list error
 * @param {object} errorMessages: Email error messages
 * @param {number} totalExpectedErrors: Total expected errors in the form
 * @param {number} totalExpectedOtherErrorsWithValidEmail: Total expected errors in the form when an email is valid.
 * @param {boolean} isGenericErrorMessage: Email has a generic error message for incorrect formatting errors.
 * @param {boolean} assertErrorWhenCorrectlyFormatted: Assert a validation error if the email is valid, but is an incorrect credential. E.g, account sign in.
 * @returns {Function} Mocha describe block with assertions.
 */
export const assertEmailFieldValidation = ({
  fieldId,
  errorIndex,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithValidEmail = 0,
  isGenericErrorMessage = false,
  assertErrorWhenCorrectlyFormatted = true,
}) => {
  const field = fieldSelector(fieldId);

  const assertions = {
    field,
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  const expectedIncorrectErrorMessage = isGenericErrorMessage ? errorMessages.INCORRECT : errorMessages.INCORRECT_FORMAT;

  describe(`${fieldId} form field validation`, () => {
    it(`should render a validation error when ${fieldId} is left empty`, () => {
      const expectedErrorMessage = isGenericErrorMessage ? errorMessages.INCORRECT : errorMessages.IS_EMPTY;

      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage });
    });

    it('should render a validation error when email does not contain an @ symbol', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_EMAILS.NO_AT_SYMBOL,
        expectedErrorMessage: expectedIncorrectErrorMessage,
      });
    });

    it('should render a validation error when email does not contain at least one dot', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_EMAILS.NO_DOTS,
        expectedErrorMessage: expectedIncorrectErrorMessage,
      });
    });

    it('should render a validation error when email contains a space', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_EMAILS.WITH_SPACE,
        expectedErrorMessage: expectedIncorrectErrorMessage,
        keyboardInputViaValueAttribute: true,
      });
    });

    it('should render a validation error when email does not contain a domain', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_EMAILS.NO_DOMAIN,
        expectedErrorMessage: expectedIncorrectErrorMessage,
      });
    });

    it('should render a validation error when email is over maximum characters', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: INVALID_EMAILS.ABOVE_MAXIMUM,
        expectedErrorMessage: errorMessages.ABOVE_MAXIMUM,
      });
    });

    if (assertErrorWhenCorrectlyFormatted) {
      it(`should NOT render a validation error when ${fieldId} is correctly formatted`, () => {
        cy.keyboardInput(field.input(), VALID_EMAIL);

        cy.clickSubmitButton();

        if (totalExpectedOtherErrorsWithValidEmail) {
          cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidEmail);
        } else {
          cy.assertErrorSummaryListDoesNotExist();
        }

        field.errorMessage().should('not.exist');
      });
    }
  });
};

export default assertEmailFieldValidation;
