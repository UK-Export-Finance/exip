import validation from './validation';
import { FIELD_IDS } from '../../../constants';
import { ERROR_MESSAGES } from '../../../content-strings';
import generateValidationErrors from '../../../helpers/validation';

describe('controllers/quote/company-based/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.VALID_COMPANY_BASE, ERROR_MESSAGES[FIELD_IDS.VALID_COMPANY_BASE]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.VALID_COMPANY_BASE} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.VALID_COMPANY_BASE, ERROR_MESSAGES[FIELD_IDS.VALID_COMPANY_BASE]);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.VALID_COMPANY_BASE]: true });

      expect(result).toEqual(null);
    });
  });
});
