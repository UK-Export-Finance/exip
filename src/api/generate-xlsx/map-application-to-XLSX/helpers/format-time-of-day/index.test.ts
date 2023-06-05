import formatTimeOfDay from '.';

describe('api/generate-xlsx/map-application-to-xlsx/helpers/format-time-of-day', () => {
  const mockTimestamp = new Date();

  it('should return a formatted timme', () => {
    const result = formatTimeOfDay(mockTimestamp);

    const hour = mockTimestamp.getHours();

    const expected = `${hour}:${mockTimestamp.getMinutes()}`;

    expect(result).toEqual(expected);
  });
});
