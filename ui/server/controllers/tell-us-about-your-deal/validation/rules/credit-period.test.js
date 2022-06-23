const rule = require('./credit-period');
const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/credit-period', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.CREDIT_PERIOD} is not provided`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_PERIOD]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.CREDIT_PERIOD} has a decimal`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_PERIOD]: '1.2',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.CREDIT_PERIOD} is not a number`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_PERIOD]: 'invalid',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.CREDIT_PERIOD} is below the minimum`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_PERIOD]: '0',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_PERIOD]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
