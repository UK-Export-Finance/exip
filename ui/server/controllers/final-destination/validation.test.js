const {
  hasErrors,
  validation,
} = require('./validation');
const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/final-destination/validation', () => {
  describe('hasErrors', () => {
    describe('when no properties are provided', () => {
      it('should return true', () => {
        const result = hasErrors({});

        expect(result).toEqual(true);
      });
    });

    describe(`when both ${FIELDS.FINAL_DESTINATION} and ${FIELDS.COUNTRY} are provided`, () => {
      describe(`when ${FIELDS.COUNTRY} does NOT have a value`, () => {
        it('should return true', () => {
          const mockBody = {
            [FIELDS.FINAL_DESTINATION]: '',
            [FIELDS.COUNTRY]: '',
          };

          const result = hasErrors(mockBody);

          expect(result).toEqual(true);
        });
      });

      describe(`when ${FIELDS.COUNTRY} has a value`, () => {
        it('should return false', () => {
          const mockBody = {
            [FIELDS.FINAL_DESTINATION]: '',
            [FIELDS.COUNTRY]: 'Australia',
          };

          const result = hasErrors(mockBody);

          expect(result).toEqual(false);
        });
      });
    });

    describe(`when only ${FIELDS.FINAL_DESTINATION} is provided and there is no value`, () => {
      it('should return true', () => {
        const mockBody = {
          [FIELDS.FINAL_DESTINATION]: '',
        };

        const result = hasErrors(mockBody);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockBody = {
        [FIELDS.FINAL_DESTINATION]: 'Australia',
      };

      const result = hasErrors(mockBody);

      expect(result).toEqual(false);
    });
  });

  describe('validation', () => {
    describe('when no values are provided', () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(
          FIELDS.COUNTRY,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.COUNTRY],
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELDS.FINAL_DESTINATION} is not provided`, () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(
          FIELDS.COUNTRY,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.COUNTRY],
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
});
