const isNumber = require('./number');

describe('sever/helpers/number', () => {
  describe('when a string is provided', () => {
    it('should return false', () => {
      const result = isNumber('test');

      expect(result).toEqual(false);
    });
  });

  describe('when a number is provided', () => {
    it('should return true', () => {
      const result = isNumber(1);

      expect(result).toEqual(true);
    });
  });
});
