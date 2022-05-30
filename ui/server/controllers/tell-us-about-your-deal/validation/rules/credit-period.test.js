const rule = require('./credit-period');
const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/credit-period', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELDS.CREDIT_PERIOD} is not provided`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELDS.CREDIT_PERIOD]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELDS.CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_PERIOD].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELDS.CREDIT_PERIOD} is not a number`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELDS.CREDIT_PERIOD]: 'invalid',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELDS.CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_PERIOD].NOT_A_NUMBER,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELDS.CREDIT_PERIOD]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
