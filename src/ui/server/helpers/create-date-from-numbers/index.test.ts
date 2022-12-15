import createDateFromNumbers from '.';

describe('server/helpers/create-date-from-numbers', () => {
  const day = 1;
  const month = 12;
  const year = 2022;

  it('shouild return a formatted currency', () => {
    const result = createDateFromNumbers(day, month, year);

    const expected = new Date(`${month} ${day} ${year}`);

    expect(result).toEqual(expected);
  });

  describe('when day is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createDateFromNumbers(undefined, month, year);

      expect(result).toEqual(null);
    });
  });

  describe('when month is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createDateFromNumbers(day, undefined, year);

      expect(result).toEqual(null);
    });
  });

  describe('when year is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createDateFromNumbers(day, month, undefined);

      expect(result).toEqual(null);
    });
  });
});
