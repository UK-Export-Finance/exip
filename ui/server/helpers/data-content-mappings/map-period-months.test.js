const mapPeriodMonths = require('./map-period-months');

describe('server/helpers/map-period-months', () => {
  describe('when value is 0', () => {
    it('should return a formatted string with `month`', () => {
      const result = mapPeriodMonths(0);

      const expected = '0 months';

      expect(result).toEqual(expected);
    });
  });

  describe('when value is 1', () => {
    it('should return a formatted string with `month`', () => {
      const result = mapPeriodMonths(1);

      const expected = '1 month';

      expect(result).toEqual(expected);
    });
  });
  
  describe('when value is not 0 or 1', () => {
    it('should return a formatted string with `months`', () => {
      const result = mapPeriodMonths(2);

      const expected = '2 months';

      expect(result).toEqual(expected);
    });
  });
});
