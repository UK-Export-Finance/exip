import mapMonthString from './map-month-string';

describe('server/helpers/map-month-string', () => {
  describe('when value is 0', () => {
    it('should return a formatted string with `month`', () => {
      const result = mapMonthString(0);

      const expected = '0 months';

      expect(result).toEqual(expected);
    });
  });

  describe('when value is 1', () => {
    it('should return a formatted string with `month`', () => {
      const result = mapMonthString(1);

      const expected = '1 month';

      expect(result).toEqual(expected);
    });
  });

  describe('when value is not 1', () => {
    it('should return a formatted string with `months`', () => {
      const result = mapMonthString(2);

      const expected = '2 months';

      expect(result).toEqual(expected);
    });
  });
});
