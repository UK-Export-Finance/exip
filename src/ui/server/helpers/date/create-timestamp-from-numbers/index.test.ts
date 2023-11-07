import createTimestampFromNumbers from '.';

describe('server/helpers/date/create-date-from-numbers', () => {
  const day = 1;
  const month = 12;
  const year = 2022;

  it('should return a formatted currency', () => {
    const result = createTimestampFromNumbers(day, month, year);

    const expected = new Date(`${month} ${day} ${year}`);

    expect(result).toEqual(expected);
  });

  describe('when day is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createTimestampFromNumbers(undefined, month, year);

      expect(result).toEqual(null);
    });
  });

  describe('when month is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createTimestampFromNumbers(day, undefined, year);

      expect(result).toEqual(null);
    });
  });

  describe('when year is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createTimestampFromNumbers(day, month, undefined);

      expect(result).toEqual(null);
    });
  });
});
