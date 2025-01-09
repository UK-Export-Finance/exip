import { INVALID_POSTCODES, VALID_POSTCODES } from '../../constants';
import { field as fieldSelector } from '../../pages/shared';

const {
  ONE_LETTER_FIRST_PART,
  NO_LETTERS_FIRST_PART,
  TWO_DIGITS_SECOND_PART,
  THREE_DIGITS_SECOND_PART,
  ALL_LETTERS_SECOND_PART,
  TOO_MANY_CHARACTERS,
  TOO_FEW_CHARACTERS,
  TOO_MANY_CHARACTERS_WITHOUT_SPACE,
  TOO_FEW_CHARACTERS_WITHOUT_SPACE,
  INVALID_CHARACTERS,
} = INVALID_POSTCODES;

/**
 * assertPostcodeFieldValidation
 * Assert postcode field validation
 * @param {String} fieldId: Postcode field ID
 * @param {Integer} errorIndex: Index of the summary list error
 * @param {Object} errorMessages: Postcode error messages
 * @param {Integer} totalExpectedErrors: Total expected errors in the form
 * @param {Integer} totalExpectedOtherErrorsWithValidPostcode: Total expected errors in the form when a postcode is valid
 * @returns {Function} Mocha describe block with assertions.
 */
export const assertPostcodeFieldValidation = ({
  fieldId,
  errorIndex,
  errorMessages,
  totalExpectedErrors = 1,
  totalExpectedOtherErrorsWithValidPostcode = 0,
}) => {
  const field = fieldSelector(fieldId);

  const assertions = {
    field,
    errorIndex,
    expectedErrorsCount: totalExpectedErrors,
  };

  describe(`${fieldId} form field validation`, () => {
    describe('invalid formats', () => {
      it(`should render a validation error when ${fieldId} is left empty`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          expectedErrorMessage: errorMessages.IS_EMPTY,
        });
      });

      it(`should render a validation error when postcode is ONE_LETTER_FIRST_PART`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: ONE_LETTER_FIRST_PART,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is NO_LETTERS_FIRST_PART`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: NO_LETTERS_FIRST_PART,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is TWO_DIGITS_SECOND_PART`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: TWO_DIGITS_SECOND_PART,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is THREE_DIGITS_SECOND_PART`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: THREE_DIGITS_SECOND_PART,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is ALL_LETTERS_SECOND_PART`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: ALL_LETTERS_SECOND_PART,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is TOO_MANY_CHARACTERS`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: TOO_MANY_CHARACTERS,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is TOO_FEW_CHARACTERS`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: TOO_FEW_CHARACTERS,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is TOO_MANY_CHARACTERS_WITHOUT_SPACE`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: TOO_MANY_CHARACTERS_WITHOUT_SPACE,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is TOO_FEW_CHARACTERS_WITHOUT_SPACE`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: TOO_FEW_CHARACTERS_WITHOUT_SPACE,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });

      it(`should render a validation error when postcode is INVALID_CHARACTERS`, () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_CHARACTERS,
          expectedErrorMessage: errorMessages.INCORRECT_FORMAT,
        });
      });
    });

    describe('valid formats', () => {
      it(`should NOT render a validation error when ${fieldId} is correctly formatted - SIX_DIGITS_WITH_SPACE`, () => {
        cy.keyboardInput(fieldSelector(fieldId).input(), VALID_POSTCODES.SIX_DIGITS_WITH_SPACE);

        cy.clickSubmitButton();

        cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPostcode);

        field.errorMessage().should('not.exist');
      });

      it(`should NOT render a validation error when ${fieldId} is correctly formatted - SIX_DIGITS_WITHOUT_SPACE`, () => {
        cy.keyboardInput(fieldSelector(fieldId).input(), VALID_POSTCODES.SIX_DIGITS_WITHOUT_SPACE);

        cy.clickSubmitButton();

        cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPostcode);

        field.errorMessage().should('not.exist');
      });

      it(`should NOT render a validation error when ${fieldId} is correctly formatted - WITH_SPACE`, () => {
        cy.keyboardInput(fieldSelector(fieldId).input(), VALID_POSTCODES.WITH_SPACE);

        cy.clickSubmitButton();

        cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPostcode);

        field.errorMessage().should('not.exist');
      });

      it(`should NOT render a validation error when ${fieldId} is correctly formatted - WITHOUT_SPACE`, () => {
        cy.keyboardInput(fieldSelector(fieldId).input(), VALID_POSTCODES.WITHOUT_SPACE);

        cy.clickSubmitButton();

        cy.assertErrorSummaryListLength(totalExpectedOtherErrorsWithValidPostcode);

        field.errorMessage().should('not.exist');
      });
    });
  });
};

export default assertPostcodeFieldValidation;
