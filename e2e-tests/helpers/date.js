import { format } from 'date-fns';
import { DATE_FORMAT } from '../constants';

/**
 * createTimestampFromNumbers
 * Create a timestamp from day, month and year numbers
 * @param {number} Day
 * @param {number} Month
 * @param {number} Year
 * @returns {string} Timestamp
 */
export const createTimestampFromNumbers = (day, month, year) => new Date(`${month} ${day} ${year}`);

/**
 * formatDate
 * Format a date with a provided date format, or default format.
 * @param {string} Timestamp
 * @param {string} Date format
 * @returns {string} Formatted date
 */
export const formatDate = (timestamp, dateFormat = DATE_FORMAT.DEFAULT) => format(new Date(timestamp), dateFormat);

/**
 * createDateOneMonthInThePast
 * Create a date that is one month in the past.
 * @returns {string} Date one month in the past
 */
export const createDateOneMonthInThePast = () => {
  const today = new Date();

  const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

  return lastMonth;
};
