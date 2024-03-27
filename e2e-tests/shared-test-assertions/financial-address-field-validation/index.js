import { field as fieldSelector } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { MAXIMUM_CHARACTERS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';

const {
  FINANCIAL_ADDRESS: FIELD_ID,
} = POLICY_FIELD_IDS;

const errorMessages = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID];

/**
 * financialAddressFieldValidation
 * Assert financial address validation
 * @param {Integer} errorIndex: Index of the summary list error
 * @param {Object} errorMessages: Email error messages
 * @returns {Function} Mocha describe block with assertions.
 */
export const financialAddressFieldValidation = ({
  errorIndex = 2,
  numberOfExpectedErrors = 3,
}) => {
  const field = fieldSelector(FIELD_ID);

  const textareaField = {
    ...field,
    input: field.textarea,
  };

  const assertions = {
    field: textareaField,
    errorIndex,
    // TODO: rename
    expectedErrorsCount: numberOfExpectedErrors,
  };

  describe(`${FIELD_ID} form field validation`, () => {
    it(`should render a validation error when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: errorMessages.IS_EMPTY });
    });

    it(`should render a validation error when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.FULL_ADDRESS + 1),
        expectedErrorMessage: errorMessages.ABOVE_MAXIMUM,
      });
    });
  });
};

export default financialAddressFieldValidation;
