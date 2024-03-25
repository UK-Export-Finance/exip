import { INVALID_EMAILS, VALID_EMAIL } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';
import partials from '../../partials';

/**
 * assertEmailFieldValidation
 * Assert email field validation
 * @param {String} fieldId: Email field ID
 * @param {Integer} errorIndex: Index of the summary list error
 * @param {Object} errorMessages: Email error messages
 * @param {Integer} totalExpectedErrors: Total expected errors in the form
 * @param {Integer} totalExpectedOtherErrorsWithValidEmail: Total expected errors in the form when an email is valid.
 * @param {Boolean} isGenericErrorMessage: Email has a generic error message for incorrect formatting errors.
 * @param {Boolean} assertErrorWhenCorrectlyFormatted: Assert a validation error if the email is valid, but is an incorrect credential. E.g, account sign in.
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

  const expectedIncorrectErrorMessage = isGenericErrorMessage ? errorMessages.INCORRECT : errorMessages.INCORRECT_FORMAT;

  describe(`${fieldId} form field validation`, () => {
    it(`should render a validation error when ${fieldId} is left empty`, () => {
      const expectedErrorMessage = isGenericErrorMessage ? errorMessages.INCORRECT : errorMessages.IS_EMPTY;

      cy.submitAndAssertFieldErrors(field, null, errorIndex, totalExpectedErrors, expectedErrorMessage);
    });

    it('should render a validation error when email does not contain an @ symbol', () => {
      const invalidEmail = INVALID_EMAILS.NO_AT_SYMBOL;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, expectedIncorrectErrorMessage);
    });

    it('should render a validation error when email does not contain at least one dot', () => {
      const invalidEmail = INVALID_EMAILS.NO_DOTS;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, expectedIncorrectErrorMessage);
    });

    it('should render a validation error when email contains a space', () => {
      const invalidEmail = INVALID_EMAILS.WITH_SPACE;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, expectedIncorrectErrorMessage);
    });

    it('should render a validation error when email does not contain a domain', () => {
      const invalidEmail = INVALID_EMAILS.NO_DOMAIN;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, expectedIncorrectErrorMessage);
    });

    it('should render a validation error when email is over maximum characters', () => {
      const invalidEmail = INVALID_EMAILS.ABOVE_MAXIMUM;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, errorMessages.ABOVE_MAXIMUM);
    });

    if (assertErrorWhenCorrectlyFormatted) {
      it(`should NOT render a validation error when ${fieldId} is correctly formatted`, () => {
        cy.keyboardInput(fieldSelector(fieldId).input(), VALID_EMAIL);

        cy.clickSubmitButton();

        cy.assertLength(partials.errorSummaryListItems(), totalExpectedOtherErrorsWithValidEmail);
      });
    }
  });
};

export default assertEmailFieldValidation;
