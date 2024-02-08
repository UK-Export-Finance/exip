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
 * @param {Boolean} assertMaximumLength: Flag for whether to assert maximum length (currently, some fields do not have this).
 * @returns {Function} Mocha describe block with assertions.
 */
export const assertEmailFieldValidation = ({
  fieldId,
  errorIndex,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithValidEmail = 0,
  assertMaximumLength = false,
}) => {
  const field = fieldSelector(fieldId);

  describe('email form field - validation', () => {
    it(`should render a validation error when ${fieldId} is not entered`, () => {
      cy.submitAndAssertFieldErrors(field, null, errorIndex, totalExpectedErrors, errorMessages.IS_EMPTY);
    });

    it('should render a validation error when email does not contain an @ symbol', () => {
      const invalidEmail = INVALID_EMAILS.NO_AT_SYMBOL;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, errorMessages.INCORRECT_FORMAT);
    });

    it('should render a validation error when email does not contain at least one dot', () => {
      const invalidEmail = INVALID_EMAILS.NO_DOTS;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, errorMessages.INCORRECT_FORMAT);
    });

    it('should render a validation error when email contains a space', () => {
      const invalidEmail = INVALID_EMAILS.WITH_SPACE;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, errorMessages.INCORRECT_FORMAT);
    });

    it('should render a validation error when email does not contain a domain', () => {
      const invalidEmail = INVALID_EMAILS.NO_DOMAIN;

      cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, errorMessages.INCORRECT_FORMAT);
    });

    if (assertMaximumLength) {
      it('should render a validation error when email is over maximum characters', () => {
        const invalidEmail = INVALID_EMAILS.ABOVE_MAXIMUM;

        cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, totalExpectedErrors, errorMessages.ABOVE_MAXIMUM);
      });
    }

    it(`should NOT render a validation error when ${fieldId} is correctly entered`, () => {
      cy.keyboardInput(fieldSelector(fieldId).input(), VALID_EMAIL);

      cy.clickSubmitButton();

      partials.errorSummaryListItems().should('have.length', totalExpectedOtherErrorsWithValidEmail);
    });
  });
};

export default assertEmailFieldValidation;
