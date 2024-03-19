import { hasErrors, validation } from '.';
import { FIELD_IDS } from '../../constants';
import * as CONTENT_STRINGS from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = FIELD_IDS;

describe('shared-validation/buyer-country', () => {
  describe('hasErrors', () => {
    describe('when no properties are provided', () => {
      it('should return true', () => {
        const result = hasErrors({});

        expect(result).toEqual(true);
      });
    });

    describe(`when ${BUYER_COUNTRY} is provided`, () => {
      describe(`when ${BUYER_COUNTRY} does NOT have a value`, () => {
        it('should return true', () => {
          const mockBody = {
            [BUYER_COUNTRY]: '',
          };

          const result = hasErrors(mockBody);

          expect(result).toEqual(true);
        });
      });
    });

    it('should return false', () => {
      const mockBody = {
        [BUYER_COUNTRY]: 'Australia',
      };

      const result = hasErrors(mockBody);

      expect(result).toEqual(false);
    });
  });

  describe('validation', () => {
    describe('when no values are provided', () => {
      it('should return a validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(BUYER_COUNTRY, CONTENT_STRINGS.ERROR_MESSAGES.ELIGIBILITY[BUYER_COUNTRY]);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${BUYER_COUNTRY} is not provided`, () => {
      it('should return a validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(BUYER_COUNTRY, CONTENT_STRINGS.ERROR_MESSAGES.ELIGIBILITY[BUYER_COUNTRY]);

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no errors', () => {
      it('should return null', () => {
        const result = validation({ [BUYER_COUNTRY]: true });

        expect(result).toEqual(null);
      });
    });
  });
});
