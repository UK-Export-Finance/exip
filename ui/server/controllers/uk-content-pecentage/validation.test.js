const validation = require('./validation');
const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/uk-content-percentage/validation', () => {
  describe('validation', () => {
    describe('when no values are provided', () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(
          FIELD_IDS.UK_CONTENT_PERCENTAGE,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].IS_EMPTY,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.UK_CONTENT_PERCENTAGE} is not provided`, () => {
      it('should return validation errors', () => {
        const result = validation({
          incorrectField: true,
        });

        const expected = generateValidationErrors(
          FIELD_IDS.UK_CONTENT_PERCENTAGE,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].IS_EMPTY,
        );

        expect(result).toEqual(expected);
      });
    });

    it('should return null', () => {
      const result = validation({
        [FIELD_IDS.UK_CONTENT_PERCENTAGE]: '50',
      });

      expect(result).toEqual(null);
    });
  });
});
