import { get30minutesFromNow, getTomorrowDay, getYesterdayDay, dateIsInThePast, dateInTheFutureByDays } from '.';

describe('api/helpers/date', () => {
  describe('get30minutesFromNow', () => {
    it('should return a minute of 30mins from now', () => {
      const result = get30minutesFromNow();

      const minutes = 30;

      // milliseconds in a minute
      const milliseconds = 60000;

      // add 30 minutes of milliseconds to the current time.
      const now = new Date();

      const expected = new Date(now.getTime() + minutes * milliseconds).getMinutes();

      expect(result).toEqual(expected);
    });
  });

  describe('getTomorrowDay', () => {
    it('should return the day of tomorrow', () => {
      const result = getTomorrowDay();

      const now = new Date();

      const expected = new Date(now.setDate(now.getDate() + 1)).getDate();

      expect(result).toEqual(expected);
    });
  });

  describe('getYesterdayDay', () => {
    it('should return the day of yesterday', () => {
      const result = getYesterdayDay();

      const now = new Date();

      const expected = new Date(now.setDate(now.getDate() - 1)).getDate();

      expect(result).toEqual(expected);
    });
  });

  describe('dateIsInThePast', () => {
    it('should true when provided date is in the past', () => {
      const now = new Date();

      const pastDate = new Date(now.setDate(now.getDate() - 30));

      const result = dateIsInThePast(pastDate);

      expect(result).toEqual(true);
    });

    it('should false when provided date is in the future', () => {
      const now = new Date();

      const futureDate = new Date(now.setDate(now.getDate() + 30));

      const result = dateIsInThePast(futureDate);

      expect(result).toEqual(false);
    });

    it('should false when date is not provided', () => {
      const result = dateIsInThePast();

      expect(result).toEqual(false);
    });
  });

  describe('dateInTheFutureByDays', () => {
    it('should return a date in the future', () => {
      const date = new Date('2024-01-01');

      const result = dateInTheFutureByDays(date, 2);

      const expected = new Date('2024-01-03');

      expect(result).toEqual(expected);
    });

    it('should return a date in the next month if provided date is the last day of the month', () => {
      const date = new Date('2024-01-31');

      const result = dateInTheFutureByDays(date, 2);

      const expected = new Date('2024-02-02');

      expect(result).toEqual(expected);
    });
  });
});
