import validation from '.';
import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';

describe('controllers/quote/exporter-location/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.VALID_EXPORTER_LOCATION, ERROR_MESSAGES[FIELD_IDS.VALID_EXPORTER_LOCATION]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.VALID_EXPORTER_LOCATION} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.VALID_EXPORTER_LOCATION, ERROR_MESSAGES[FIELD_IDS.VALID_EXPORTER_LOCATION]);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.VALID_EXPORTER_LOCATION]: true });

      expect(result).toEqual(null);
    });
  });
});
