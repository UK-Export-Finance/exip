import formatTimeOfDay from '.';

describe('server/helpers/date/format-date', () => {
  const mockTimestamp = new Date();

  it('should return a formatted timme', () => {
    const result = formatTimeOfDay(mockTimestamp);

    const expected = `${mockTimestamp.getHours()}:${mockTimestamp.getMinutes()}`;

    expect(result).toEqual(expected);
  });
});
