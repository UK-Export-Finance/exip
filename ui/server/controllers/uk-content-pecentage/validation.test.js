const {
  getValidationErrors,
  validation,
} = require('./validation');
const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/final-destination/validation', () => {
  describe('getValidationErrors', () => {
    it('should return the result of generateValidationErrors with field and provided message', () => {
      const result = getValidationErrors(CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].NOT_A_NUMBER);

      const expected = generateValidationErrors(
        FIELD_IDS.UK_CONTENT_PERCENTAGE,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].NOT_A_NUMBER,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('validation', () => {
    describe('when no values are provided', () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = getValidationErrors(
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

        const expected = getValidationErrors(
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].IS_EMPTY,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.UK_CONTENT_PERCENTAGE} is not a number`, () => {
      it('should return validation errors', () => {
        const result = validation({
          [FIELD_IDS.UK_CONTENT_PERCENTAGE]: 'string',
        });

        const expected = getValidationErrors(
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].NOT_A_NUMBER,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.UK_CONTENT_PERCENTAGE} is less than 0`, () => {
      it('should return validation errors', () => {
        const result = validation({
          [FIELD_IDS.UK_CONTENT_PERCENTAGE]: '-1',
        });

        const expected = getValidationErrors(
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].BELOW_MINIMUM,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.UK_CONTENT_PERCENTAGE} is greater than 100`, () => {
      it('should return validation errors', () => {
        const result = validation({
          [FIELD_IDS.UK_CONTENT_PERCENTAGE]: '101',
        });

        const expected = getValidationErrors(
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].ABOVE_MAXIMUM,
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
