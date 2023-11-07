import isAboveMaxLength from '.';

describe('server/helpers/is-above-max-length', () => {
  describe('string is above maximum provided length', () => {
    it('should return true', () => {
      const string = 'a'.repeat(200);
      const maxLength = 191;

      const response = isAboveMaxLength(string, maxLength);

      expect(response).toEqual(true);
    });
  });

  describe('string is the same as maximum provided length', () => {
    it('should return false', () => {
      const string = 'a'.repeat(190);
      const maxLength = 191;

      const response = isAboveMaxLength(string, maxLength);

      expect(response).toEqual(false);
    });
  });

  describe('string is the below the maximum provided length', () => {
    it('should return false', () => {
      const string = 'a'.repeat(5);
      const maxLength = 191;

      const response = isAboveMaxLength(string, maxLength);

      expect(response).toEqual(false);
    });
  });
});
