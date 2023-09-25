import { hasDisallowedCharacters, costRules } from './cost';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  ELIGIBILITY: { CONTRACT_VALUE, MAX_AMOUNT_OWED },
  POLICY_TYPE,
} = FIELD_IDS;

describe('controllers/quote/tell-us-about-your-policy/validation/rules/cost', () => {
  describe('hasDisallowedCharacters', () => {
    describe('with character that is not a number or comma', () => {
      it('should return true', () => {
        const result = hasDisallowedCharacters('£123.45');

        expect(result).toEqual(true);
      });
    });

    describe('with a character that is a number or comma', () => {
      it('should return false', () => {
        const result = hasDisallowedCharacters('123,456,78');

        expect(result).toEqual(false);
      });
    });
  });

  describe('rules', () => {
    const mockErrors = {
      summary: [],
      errorList: {},
    };

    describe('when policy type is single', () => {
      describe(`when ${CONTRACT_VALUE} is not provided`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [CONTRACT_VALUE]: '',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(CONTRACT_VALUE, ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${CONTRACT_VALUE} is not a whole number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [CONTRACT_VALUE]: '123,456.78',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(CONTRACT_VALUE, ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${CONTRACT_VALUE} has invalid characters`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [CONTRACT_VALUE]: '£123,456',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(CONTRACT_VALUE, ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${CONTRACT_VALUE} is not a number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [CONTRACT_VALUE]: 'invalid',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(CONTRACT_VALUE, ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${CONTRACT_VALUE} is below the minimum`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [CONTRACT_VALUE]: '0',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(CONTRACT_VALUE, ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe('when there are no validation errors', () => {
        it('should return the already provided errors', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [CONTRACT_VALUE]: '1,234,567',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });
    });

    describe('when policy type is multiple', () => {
      describe(`when ${MAX_AMOUNT_OWED} is not provided`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
            [MAX_AMOUNT_OWED]: '',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(MAX_AMOUNT_OWED, ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].IS_EMPTY, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAX_AMOUNT_OWED} is not a whole number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
            [MAX_AMOUNT_OWED]: '123,456.78',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(MAX_AMOUNT_OWED, ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAX_AMOUNT_OWED} has invalid characters`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
            [MAX_AMOUNT_OWED]: '£123,456',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(MAX_AMOUNT_OWED, ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_NUMBER, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAX_AMOUNT_OWED} is not a number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
            [MAX_AMOUNT_OWED]: 'invalid',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(MAX_AMOUNT_OWED, ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_NUMBER, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAX_AMOUNT_OWED} is below the minimum`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
            [MAX_AMOUNT_OWED]: '0',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(MAX_AMOUNT_OWED, ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].BELOW_MINIMUM, mockErrors);

          expect(result).toEqual(expected);
        });
      });

      describe('when there are no validation errors', () => {
        it('should return the already provided errors', () => {
          const mockSubmittedData = {
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
            [MAX_AMOUNT_OWED]: '1,234,567',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });
    });
  });
});
