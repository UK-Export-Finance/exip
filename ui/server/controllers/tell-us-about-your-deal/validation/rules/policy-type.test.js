const rule = require('./policy-type');
const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/policy-type', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELDS.POLICY_TYPE} is not provided`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELDS.POLICY_TYPE]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELDS.POLICY_TYPE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.POLICY_TYPE],
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELDS.POLICY_TYPE]: 'single',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
