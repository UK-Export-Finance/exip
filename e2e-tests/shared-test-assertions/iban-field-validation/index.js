import { field as fieldSelector } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    IBAN: FIELD_ID,
  },
} = POLICY_FIELD_IDS;

const errorMessages = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID];

/**
 * ibanFieldValidation
 * Assert IBAN validation
 * @returns {Function} Mocha describe block with assertions.
 */
export const ibanFieldValidation = () => {
  const assertions = {
    field: fieldSelector(FIELD_ID),
    errorIndex: 1,
    expectedErrorsCount: 3,
  };

  describe(`${FIELD_ID} form field validation`, () => {
    it(`should render a validation error when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: errorMessages.IS_EMPTY });
    });

    it(`should render a validation error when ${FIELD_ID} is below ${MINIMUM_CHARACTERS.IBAN} characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'A'.repeat(MINIMUM_CHARACTERS.IBAN - 1),
        expectedErrorMessage: errorMessages.BELOW_MINIMUM,
      });
    });

    it(`should render a validation error when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.IBAN} characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'A'.repeat(MAXIMUM_CHARACTERS.IBAN + 1),
        expectedErrorMessage: errorMessages.ABOVE_MAXIMUM,
      });
    });
  });
};

export default ibanFieldValidation;
