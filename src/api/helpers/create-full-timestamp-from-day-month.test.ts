import createTimestampFromNumbers from './create-full-timestamp-from-day-month';

describe('api/helpers/create-date-from-numbers', () => {
  const day = '1';
  const month = '12';

  describe('when day is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createTimestampFromNumbers(undefined, month);

      expect(result).toEqual(null);
    });
  });

  describe('when month is not provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = createTimestampFromNumbers(day, undefined);

      expect(result).toEqual(null);
    });
  });

  describe('when provided dates are correct', () => {
    it('should return timestamp', () => {
      const result = createTimestampFromNumbers(day, month);

      const expected = new Date(`${new Date().getFullYear()}-${month}-${day}`);

      expect(result).toEqual(expected);
    });
  });
});
