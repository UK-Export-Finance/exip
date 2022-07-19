const {
  hasDisllowedCharacters,
  amountRules,
} = require('./amount');
const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/amount', () => {
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

    describe(`when ${FIELD_IDS.AMOUNT} is not provided`, () => {
      it('should return validation error', () => {
        const mockBody = {
          [FIELD_IDS.AMOUNT]: '',
        };

        const result = amountRules(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.AMOUNT,
          ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.AMOUNT} is not a whole number`, () => {
      it('should return validation error', () => {
        const mockBody = {
          [FIELD_IDS.AMOUNT]: '123,456.78',
        };

        const result = amountRules(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.AMOUNT,
          ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_WHOLE_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.AMOUNT} has invalid characters`, () => {
      it('should return validation error', () => {
        const mockBody = {
          [FIELD_IDS.AMOUNT]: '£123,456',
        };

        const result = amountRules(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.AMOUNT,
          ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.AMOUNT} is not a number`, () => {
      it('should return validation error', () => {
        const mockBody = {
          [FIELD_IDS.AMOUNT]: 'invalid',
        };

        const result = amountRules(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.AMOUNT,
          ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.AMOUNT} is below the minimum`, () => {
      it('should return validation error', () => {
        const mockBody = {
          [FIELD_IDS.AMOUNT]: '0',
        };

        const result = amountRules(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.AMOUNT,
          ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no validation errors', () => {
      it('should return the already provided errors', () => {
        const mockBody = {
          [FIELD_IDS.AMOUNT]: '1,234,567',
        };

        const result = amountRules(mockBody, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });
  });
});
