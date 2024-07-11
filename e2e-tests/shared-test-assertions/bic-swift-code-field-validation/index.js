import { field as fieldSelector } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import mockStringWithSpecialCharacters from '../../fixtures/string-with-special-characters';
import SPECIAL_CHARACTERS from '../../fixtures/special-characters';
import { mockBicSwiftCodeLowerCase } from '../../fixtures/bic-swift-codes';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    BIC_SWIFT_CODE: FIELD_ID,
  },
} = POLICY_FIELD_IDS;

const errorMessages = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID];

/**
 * runAssertion
 * Run the submitAndAssertFieldErrors command.
 * This saves repeated instances of this command in each mocha describe block.
 * @param {String} value: Field value
 * @param {String} expectedErrorMessage: Expected error message
 */
const runAssertion = ({ value, expectedErrorMessage = errorMessages.INCORRECT_FORMAT }) => {
  cy.submitAndAssertFieldErrors({
    field: fieldSelector(FIELD_ID),
    value,
    expectedErrorsCount: 3,
    expectedErrorMessage,
  });
};

/**
 * bicSwiftCodeFieldValidation
 * Assert BIC/SWIFT code validation
 * @returns {Function} Mocha describe block with assertions.
 */
export const bicSwiftCodeFieldValidation = () => {
  describe(`${FIELD_ID} form field validation`, () => {
    it(`should render a validation error when ${FIELD_ID} is left empty`, () => {
      runAssertion({ value: '', expectedErrorMessage: errorMessages.IS_EMPTY });
    });

    it(`should render a validation error when ${FIELD_ID} contains only letters`, () => {
      runAssertion({ value: 'LETTERSONLY' });
    });

    it(`should render a validation error when ${FIELD_ID} contains only numbers`, () => {
      runAssertion({ value: '12345678' });
    });

    it(`should render a validation error when ${FIELD_ID} contains only special characters`, () => {
      runAssertion({ value: mockStringWithSpecialCharacters });
    });

    it(`should render a validation error when ${FIELD_ID} contains only letters and special characters`, () => {
      runAssertion({ value: `MOCK${SPECIAL_CHARACTERS}` });
    });

    it(`should render a validation error when ${FIELD_ID} contains only numbers and special characters`, () => {
      runAssertion({ value: `1234${SPECIAL_CHARACTERS}` });
    });

    it(`should render a validation error when ${FIELD_ID} contains letters, numbers and special characters`, () => {
      runAssertion({ value: `MOCK1${SPECIAL_CHARACTERS}` });
    });

    it(`should render a validation error when ${FIELD_ID} contains letters, numbers and an empty space`, () => {
      runAssertion({ value: 'LETTERS1 ' });
    });

    it(`should render a validation error when ${FIELD_ID} contains letters, numbers, special characters and an empty space`, () => {
      runAssertion({ value: `A1${SPECIAL_CHARACTERS} ` });
    });

    it(`should render a validation error when ${FIELD_ID} is below ${MINIMUM_CHARACTERS.BIC_SWIFT_CODE} characters`, () => {
      const value = 'A1'.repeat(MINIMUM_CHARACTERS.BIC_SWIFT_CODE - 2);

      runAssertion({ value, expectedErrorMessage: errorMessages.BELOW_MINIMUM });
    });

    it(`should render a validation error when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.BIC_SWIFT_CODE} characters`, () => {
      const value = 'A1'.repeat(MAXIMUM_CHARACTERS.BIC_SWIFT_CODE / 2 + 1);

      runAssertion({ value, expectedErrorMessage: errorMessages.ABOVE_MAXIMUM });
    });

    it(`should NOT render a validation error for ${FIELD_ID} when it is correctly entered with lowercase letters and numbers`, () => {
      cy.keyboardInput(fieldSelector(FIELD_ID).input(), mockBicSwiftCodeLowerCase);

      cy.clickSubmitButton();

      cy.assertErrorSummaryListLength(2);
    });
  });
};

export default bicSwiftCodeFieldValidation;
