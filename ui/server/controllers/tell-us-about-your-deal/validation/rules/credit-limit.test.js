const rule = require('./credit-limit');
const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/credit-limit', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.CREDIT_LIMIT} is not a number`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_LIMIT]: 'invalid',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.CREDIT_LIMIT,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_LIMIT].NOT_A_NUMBER,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELD_IDS.CREDIT_LIMIT]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
