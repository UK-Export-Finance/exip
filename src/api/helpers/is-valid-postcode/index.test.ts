import { isValidPostcode } from '.';
import { INVALID_POSTCODES, VALID_POSTCODES } from '../../test-mocks/mock-postcodes';

const assertions = {
  invalid: Object.values(INVALID_POSTCODES),
  valid: Object.values(VALID_POSTCODES),
};

describe('api/helpers/is-valid-postcode', () => {
  describe('invalid formats', () => {
    it.each(assertions.invalid)('should return false with %s format', (postcode) => {
      const result = isValidPostcode(postcode);

      expect(result).toEqual(false);
    });
  });

  describe('valid formats', () => {
    it.each(assertions.valid)('should return true with %s format', (postcode) => {
      const result = isValidPostcode(postcode);

      expect(result).toEqual(true);
    });
  });
});
