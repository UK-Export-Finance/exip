const mapPeriodMonths = require('./map-period-months');

describe('server/helpers/map-period-months', () => {
  it('should return a formatted string', () => {
    const result = mapPeriodMonths(20);

    const expected = '20 months';

    expect(result).toEqual(expected);
  });
});
