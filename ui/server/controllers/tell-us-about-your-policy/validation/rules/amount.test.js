const rule = require('./amount');
const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/amount', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.AMOUNT} is not provided`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.AMOUNT]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.AMOUNT,
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY,
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

      const result = rule(mockBody, mockErrors);

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

      const result = rule(mockBody, mockErrors);

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
        [FIELD_IDS.AMOUNT]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
