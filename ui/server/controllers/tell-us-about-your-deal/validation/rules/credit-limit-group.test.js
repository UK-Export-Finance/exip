const rule = require('./credit-limit-group');
const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/credit-limit-group', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELDS.CREDIT_LIMIT_CURRENCY} does not have a value`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELDS.CREDIT_LIMIT_CURRENCY]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELDS.CREDIT_LIMIT_GROUP,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_LIMIT_GROUP].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELDS.CREDIT_LIMIT} does not have a value`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELDS.CREDIT_LIMIT]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELDS.CREDIT_LIMIT_GROUP,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_LIMIT_GROUP].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when neither of 2 fields are provided', () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELDS.CREDIT_LIMIT_CURRENCY]: '',
        [FIELDS.CREDIT_LIMIT]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELDS.CREDIT_LIMIT_GROUP,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_LIMIT_GROUP].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELDS.CREDIT_LIMIT_CURRENCY]: 'GBP',
        [FIELDS.CREDIT_LIMIT]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
