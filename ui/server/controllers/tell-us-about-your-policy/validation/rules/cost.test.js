const {
  hasDisllowedCharacters,
  costRules,
} = require('./cost');
const { FIELD_IDS, FIELD_VALUES } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/cost', () => {
  describe('hasDisllowedCharacters', () => {
    describe('with character that is not a number or comma', () => {
      it('should return true', () => {
        const result = hasDisllowedCharacters('£123.45');

        expect(result).toEqual(true);
      });
    });

    describe('with a character that is a number or comma', () => {
      it('should return false', () => {
        const result = hasDisllowedCharacters('123,456,78');

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
      describe(`when ${FIELD_IDS.CONTRACT_VALUE} is not provided`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [FIELD_IDS.CONTRACT_VALUE]: '',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.CONTRACT_VALUE,
            ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].IS_EMPTY,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.CONTRACT_VALUE} is not a whole number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [FIELD_IDS.CONTRACT_VALUE]: '123,456.78',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.CONTRACT_VALUE,
            ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_WHOLE_NUMBER,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.CONTRACT_VALUE} has invalid characters`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [FIELD_IDS.CONTRACT_VALUE]: '£123,456',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.CONTRACT_VALUE,
            ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_NUMBER,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.CONTRACT_VALUE} is not a number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [FIELD_IDS.CONTRACT_VALUE]: 'invalid',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.CONTRACT_VALUE,
            ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_NUMBER,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.CONTRACT_VALUE} is below the minimum`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [FIELD_IDS.CONTRACT_VALUE]: '0',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.CONTRACT_VALUE,
            ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].BELOW_MINIMUM,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe('when there are no validation errors', () => {
        it('should return the already provided errors', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
            [FIELD_IDS.CONTRACT_VALUE]: '1,234,567',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });
    });

    describe('when policy type is multi', () => {
      describe(`when ${FIELD_IDS.MAX_AMOUNT_OWED} is not provided`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
            [FIELD_IDS.MAX_AMOUNT_OWED]: '',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.MAX_AMOUNT_OWED,
            ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].IS_EMPTY,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.MAX_AMOUNT_OWED} is not a whole number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
            [FIELD_IDS.MAX_AMOUNT_OWED]: '123,456.78',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.MAX_AMOUNT_OWED,
            ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.MAX_AMOUNT_OWED} has invalid characters`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
            [FIELD_IDS.MAX_AMOUNT_OWED]: '£123,456',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.MAX_AMOUNT_OWED,
            ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_NUMBER,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.MAX_AMOUNT_OWED} is not a number`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
            [FIELD_IDS.MAX_AMOUNT_OWED]: 'invalid',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.MAX_AMOUNT_OWED,
            ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_NUMBER,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${FIELD_IDS.MAX_AMOUNT_OWED} is below the minimum`, () => {
        it('should return validation error', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
            [FIELD_IDS.MAX_AMOUNT_OWED]: '0',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          const expected = generateValidationErrors(
            FIELD_IDS.MAX_AMOUNT_OWED,
            ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].BELOW_MINIMUM,
            mockErrors,
          );

          expect(result).toEqual(expected);
        });
      });

      describe('when there are no validation errors', () => {
        it('should return the already provided errors', () => {
          const mockSubmittedData = {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
            [FIELD_IDS.MAX_AMOUNT_OWED]: '1,234,567',
          };

          const result = costRules(mockSubmittedData, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });
    });
  });
});
