import validation from './validation';
import { FIELD_IDS } from '../../../constants';
import { ERROR_MESSAGES } from '../../../content-strings';
import generateValidationErrors from '../../../helpers/validation';

describe('controllers/root/cookies/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.OPTIONAL_COOKIES, ERROR_MESSAGES[FIELD_IDS.OPTIONAL_COOKIES]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.OPTIONAL_COOKIES} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({ anotherField: true });

      const expected = generateValidationErrors(FIELD_IDS.OPTIONAL_COOKIES, ERROR_MESSAGES[FIELD_IDS.OPTIONAL_COOKIES]);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.OPTIONAL_COOKIES]: 'accept' });

      expect(result).toEqual(null);
    });
  });
});
