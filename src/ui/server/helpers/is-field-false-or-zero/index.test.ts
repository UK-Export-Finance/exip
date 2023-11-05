import isFieldFalseOrZero from '.';

describe('server/helpers/is-field-false-or-zero', () => {
  describe('field is 0', () => {
    it('should return true', () => {
      const field = 0;

      const result = isFieldFalseOrZero(field);

      expect(result).toEqual(true);
    });
  });

  describe('field is false', () => {
    it('should return true', () => {
      const field = false;

      const result = isFieldFalseOrZero(field);

      expect(result).toEqual(true);
    });
  });

  describe('field is 1', () => {
    it('should return false', () => {
      const field = 1;

      const result = isFieldFalseOrZero(field);

      expect(result).toEqual(false);
    });
  });

  describe('field is true', () => {
    it('should return false', () => {
      const field = true;

      const result = isFieldFalseOrZero(field);

      expect(result).toEqual(false);
    });
  });

  describe('field a string', () => {
    it('should return false', () => {
      const field = 'abc';

      const result = isFieldFalseOrZero(field);

      expect(result).toEqual(false);
    });
  });
});
