import validation from './validation';
import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';

describe('controllers/can-get-private-insurance/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES, ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES, ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no errors', () => {
    it('should return null', () => {
      const result = validation({ [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: true });

      expect(result).toEqual(null);
    });
  });
});
