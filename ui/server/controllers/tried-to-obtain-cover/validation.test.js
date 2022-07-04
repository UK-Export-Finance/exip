const validation = require('./validation');
const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/tried-to-obtain-cover/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELD_IDS.TRIED_PRIVATE_COVER_YES,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.TRIED_PRIVATE_COVER],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.TRIED_PRIVATE_COVER} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELD_IDS.TRIED_PRIVATE_COVER_YES,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.TRIED_PRIVATE_COVER],
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.TRIED_PRIVATE_COVER]: true });

      expect(result).toEqual(null);
    });
  });
});
