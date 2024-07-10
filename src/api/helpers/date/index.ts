import { isAfter } from 'date-fns';

/**
 * get30minutesFromNow
 * Get 30 minutes from now and return the minute
 * @returns {Integer} 30 minutes from now
 */
export const get30minutesFromNow = (): number => {
  const now = new Date();

  const minutes = 30;

  // milliseconds in a minute
  const milliseconds = 60000;

  // add 30 minutes of milliseconds to the current time.
  const result = new Date(now.getTime() + minutes * milliseconds).getMinutes();

  return result;
};

/**
 * getTomorrowDay
 * Get 1 day from now and return the day
 * @returns {Integer} 1 day from now
 */
export const getTomorrowDay = (): number => {
  const now = new Date();

  const result = new Date(now.setDate(now.getDate() + 1)).getDate();

  return result;
};

/**
 * getYesterdayDay
 * Get 1 day before now and return the day
 * @returns {Integer} 1 day before today
 */
export const getYesterdayDay = (): number => {
  const now = new Date();

  const result = new Date(now.setDate(now.getDate() - 1)).getDate();

  return result;
};

/**
 * dateIsInThePast
 * Is the time now after a specified date
 * @param {Date} targetDate
 * @returns {Boolean}
 */
export const dateIsInThePast = (targetDate: Date) => {
  const now = new Date();

  return isAfter(now, targetDate);
};

/**
 * dateInTheFutureByDays
 * generates a date in the future by a specified number of days
 * @param {Date} date
 * @param {number} days: number of days to add
 * @returns {Date}
 */
export const dateInTheFutureByDays = (date: Date, days: number) => new Date(date.setDate(date.getDate() + days));
