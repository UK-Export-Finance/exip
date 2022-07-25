const rule = require('./percentage-of-cover');
const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/percentage-of-cover', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.PERCENTAGE_OF_COVER} is not provided`, () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_IDS.PERCENTAGE_OF_COVER]: '',
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.PERCENTAGE_OF_COVER,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });
});
