const {
  hasErrors,
  validation,
} = require('./validation');
const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/buyer-based/validation', () => {
  describe('hasErrors', () => {
    describe('when no properties are provided', () => {
      it('should return true', () => {
        const result = hasErrors({});

        expect(result).toEqual(true);
      });
    });

    describe(`when both ${FIELD_IDS.BUYER_COUNTRY} and ${FIELD_IDS.COUNTRY} are provided`, () => {
      describe(`when ${FIELD_IDS.COUNTRY} does NOT have a value`, () => {
        it('should return true', () => {
          const mockBody = {
            [FIELD_IDS.BUYER_COUNTRY]: '',
            [FIELD_IDS.COUNTRY]: '',
          };

          const result = hasErrors(mockBody);

          expect(result).toEqual(true);
        });
      });

      describe(`when ${FIELD_IDS.COUNTRY} has a value`, () => {
        it('should return false', () => {
          const mockBody = {
            [FIELD_IDS.BUYER_COUNTRY]: '',
            [FIELD_IDS.COUNTRY]: 'Australia',
          };

          const result = hasErrors(mockBody);

          expect(result).toEqual(false);
        });
      });
    });

    describe(`when only ${FIELD_IDS.BUYER_COUNTRY} is provided and there is no value`, () => {
      it('should return true', () => {
        const mockBody = {
          [FIELD_IDS.BUYER_COUNTRY]: '',
        };

        const result = hasErrors(mockBody);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockBody = {
        [FIELD_IDS.BUYER_COUNTRY]: 'Australia',
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
          FIELD_IDS.COUNTRY,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.COUNTRY],
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.BUYER_COUNTRY} is not provided`, () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(
          FIELD_IDS.COUNTRY,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.COUNTRY],
        );

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no errors', () => {
      it('should return null', () => {
        const result = validation({ [FIELD_IDS.BUYER_COUNTRY]: true });

        expect(result).toEqual(null);
      });
    });
  });
});
