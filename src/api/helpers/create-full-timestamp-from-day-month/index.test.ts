import createTimestampFromNumbers from '.';

describe('api/helpers/create-date-from-numbers', () => {
  const day = '1';
  const month = '12';

  describe('when day is not provided', () => {
    it('should return null', () => {
      const result = createTimestampFromNumbers(undefined, month);

      expect(result).toBeNull();
    });
  });

  describe('when month is not provided', () => {
    it('should return null', () => {
      const result = createTimestampFromNumbers(day);

      expect(result).toBeNull();
    });
  });

  describe('when provided dates are provided', () => {
    it('should return timestamp', () => {
      const result = createTimestampFromNumbers(day, month);

      const expected = new Date(`${new Date().getFullYear()}-${month}-${day}`);

      expect(result).toEqual(expected);
    });
  });
});
