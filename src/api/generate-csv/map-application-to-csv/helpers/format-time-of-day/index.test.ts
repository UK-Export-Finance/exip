import formatTimeOfDay from '.';

describe('api/generate-csv/map-application-to-csv/helpers/format-time-of-day', () => {
  const mockTimestamp = new Date();

  it('should return a formatted timme', () => {
    const result = formatTimeOfDay(mockTimestamp);

    const utcHour = mockTimestamp.getUTCHours();

    const expected = `${utcHour}:${mockTimestamp.getMinutes()}`;

    expect(result).toEqual(expected);
  });
});
