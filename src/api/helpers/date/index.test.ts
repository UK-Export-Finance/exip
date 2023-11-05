import { get30minutesFromNow, getTomorrowDay, getYesterdayDay } from '.';

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
});
