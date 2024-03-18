import isAboveMinLength from '.';

const minLength = 10;

describe('server/helpers/is-above-min-length', () => {
  describe('string is below minimum provided length', () => {
    it('should return true', () => {
      const string = 'a'.repeat(minLength - 1);

      const response = isAboveMinLength(string, minLength);

      expect(response).toEqual(true);
    });
  });

  describe('string is the same as minimum provided length', () => {
    it('should return false', () => {
      const string = 'a'.repeat(minLength);

      const response = isAboveMinLength(string, minLength);

      expect(response).toEqual(false);
    });
  });

  describe('string is the above the minimum provided length', () => {
    it('should return false', () => {
      const string = 'a'.repeat(minLength + 1);

      const response = isAboveMinLength(string, minLength);

      expect(response).toEqual(false);
    });
  });
});
