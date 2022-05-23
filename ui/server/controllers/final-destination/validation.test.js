const validation = require('./validation');
const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/final-destination/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELDS.COUNTRY_SEARCH,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.COUNTRY_SEARCH],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELDS.FINAL_DESTINATION} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELDS.COUNTRY_SEARCH,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.COUNTRY_SEARCH],
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELDS.FINAL_DESTINATION]: true });

      expect(result).toEqual(null);
    });
  });
});
