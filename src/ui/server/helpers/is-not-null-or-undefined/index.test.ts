import isNotNullOrUndefined from '.';

describe('isNotNullOrUndefined', () => {
  describe('when the value is undefined', () => {
    it('should return false', () => {
      const result = isNotNullOrUndefined();

      expect(result).toEqual(false);
    });
  });

  describe('when the value is null', () => {
    it('should return false', () => {
      const result = isNotNullOrUndefined(null);

      expect(result).toEqual(false);
    });
  });

  describe('when the value is a string', () => {
    it('should return true', () => {
      const result = isNotNullOrUndefined('abc');

      expect(result).toEqual(true);
    });
  });

  describe('when the value is a string', () => {
    it('should return true', () => {
      const result = isNotNullOrUndefined('abc');

      expect(result).toEqual(true);
    });
  });

  describe('when the value is a number', () => {
    it('should return true', () => {
      const result = isNotNullOrUndefined(12);

      expect(result).toEqual(true);
    });
  });

  describe('when the value is 0', () => {
    it('should return true', () => {
      const result = isNotNullOrUndefined(0);

      expect(result).toEqual(true);
    });
  });
});
