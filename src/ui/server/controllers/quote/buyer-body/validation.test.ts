import validation from './validation';
import { FIELD_IDS } from '../../../constants';
import { ERROR_MESSAGES } from '../../../content-strings';
import generateValidationErrors from '../../../helpers/validation';

describe('controllers/quote/buyer-body/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.VALID_BUYER_BODY, ERROR_MESSAGES[FIELD_IDS.VALID_BUYER_BODY]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.VALID_BUYER_BODY} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.VALID_BUYER_BODY, ERROR_MESSAGES[FIELD_IDS.VALID_BUYER_BODY]);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.VALID_BUYER_BODY]: true });

      expect(result).toEqual(null);
    });
  });
});
