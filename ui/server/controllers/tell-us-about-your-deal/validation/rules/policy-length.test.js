const rule = require('./policy-length');
const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/policy-length', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.POLICY_LENGTH} is not provided`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_LENGTH]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.POLICY_LENGTH,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.POLICY_LENGTH].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.POLICY_LENGTH} is not a number`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_LENGTH]: 'invalid',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.POLICY_LENGTH,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.POLICY_LENGTH].NOT_A_NUMBER,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_LENGTH]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
