const rule = require('./pre-credit-period');
const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-deal/validation/rules/pre-credit-period', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.PRE_CREDIT_PERIOD} is not a number`, () => {
    it('should return validation error', () => {
      const mockBody = {
        [FIELD_IDS.PRE_CREDIT_PERIOD]: 'invalid',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(
        FIELD_IDS.PRE_CREDIT_PERIOD,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER,
        mockErrors,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELD_IDS.PRE_CREDIT_PERIOD]: '10',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
