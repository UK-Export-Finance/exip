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
  const errorIndex = 1;
  const numberOfExpectedErrors = 3;
  const field = fieldSelector(FIELD_ID);

  describe(`${FIELD_ID} form field validation`, () => {
    it(`should render a validation error when ${FIELD_ID} is left empty`, () => {
      const value = '';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessages.IS_EMPTY);
    });

    it(`should render a validation error when ${FIELD_ID} is below ${MINIMUM_CHARACTERS.IBAN} characters`, () => {
      const value = 'A'.repeat(MINIMUM_CHARACTERS.IBAN - 1);

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessages.BELOW_MINIMUM);
    });

    it(`should render a validation error when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.IBAN} characters`, () => {
      const value = 'A'.repeat(MAXIMUM_CHARACTERS.IBAN + 1);

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessages.ABOVE_MAXIMUM);
    });
  });
};

export default ibanFieldValidation;
