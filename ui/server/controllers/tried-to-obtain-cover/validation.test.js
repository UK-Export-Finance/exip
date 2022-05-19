const validation = require('./validation');
const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/tried-to-obtain-cover/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELDS.TRIED_PRIVATE_COVER,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.TRIED_PRIVATE_COVER],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELDS.TRIED_PRIVATE_COVER} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELDS.TRIED_PRIVATE_COVER,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.TRIED_PRIVATE_COVER],
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELDS.TRIED_PRIVATE_COVER]: true });

      expect(result).toEqual(null);
    });
  });
});
