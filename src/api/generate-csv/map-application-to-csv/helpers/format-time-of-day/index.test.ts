import formatTimeOfDay from '.';

describe('api/generate-csv/map-application-to-csv/helpers/format-time-of-day', () => {
  const mockTimestamp = new Date();

  it('should return a formatted timme', () => {
    const result = formatTimeOfDay(mockTimestamp);

    const expected = `${mockTimestamp.getHours()}:${mockTimestamp.getMinutes()}`;

    expect(result).toEqual(expected);
  });
});
