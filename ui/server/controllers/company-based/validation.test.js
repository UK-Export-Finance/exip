const validation = require('./validation');
const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/company-based/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELD_IDS.VALID_COMPANY_BASE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.VALID_COMPANY_BASE],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.VALID_COMPANY_BASE} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELD_IDS.VALID_COMPANY_BASE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.VALID_COMPANY_BASE],
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.VALID_COMPANY_BASE]: true });

      expect(result).toEqual(null);
    });
  });
});
