const mapPeriodDays = require('./map-period-days');

describe('server/helpers/map-period-months', () => {
  it('should return a formatted string', () => {
    const result = mapPeriodDays(20);

    const expected = '20 days';

    expect(result).toEqual(expected);
  });
});
