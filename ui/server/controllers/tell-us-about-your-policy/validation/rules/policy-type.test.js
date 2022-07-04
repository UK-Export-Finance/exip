const rule = require('./policy-type');
const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/policy-type', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.POLICY_TYPE} is not provided`, () => {
    it('should return validation error with first policy type field as ID', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_TYPE]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.SINGLE_POLICY_TYPE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE],
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_TYPE]: 'single',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
