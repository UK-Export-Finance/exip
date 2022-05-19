const validation = require('./validation');
const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/buyer-based/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELDS.VALID_BUYER_BASE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.VALID_BUYER_BASE],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELDS.VALID_BUYER_BASE} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELDS.VALID_BUYER_BASE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.VALID_BUYER_BASE],
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELDS.VALID_BUYER_BASE]: true });

      expect(result).toEqual(null);
    });
  });
});
