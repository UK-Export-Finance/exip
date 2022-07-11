const validation = require('./validation');
const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');

describe('controllers/can-get-private-insurance/validation', () => {
  describe('when no values are provided', () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({});

      const expected = generateValidationErrors(
        FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
        CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
      );

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
