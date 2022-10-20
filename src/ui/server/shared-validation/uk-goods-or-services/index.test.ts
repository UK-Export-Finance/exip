import validation from '.';
import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/uk-goods-or-services', () => {
  describe('validation', () => {
    describe('when no values are provided', () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(
          FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
          ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES} is not provided`, () => {
      it('should return validation errors', () => {
        const result = validation({
          incorrectField: true,
        });

        const expected = generateValidationErrors(
          FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
          ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY,
        );

        expect(result).toEqual(expected);
      });
    });

    it('should return null', () => {
      const result = validation({
        [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
      });

      expect(result).toEqual(null);
    });
  });
});
