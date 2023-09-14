import { format } from 'date-fns';
import { DATE_FORMAT } from '../constants';

/**
 * createTimestampFromNumbers
 * Create a timestamp from day, month and year numbers
 * @param {Number} Day
 * @param {Number} Month
 * @param {Number} Year
 * @returns {String} Timestamp
 */
export const createTimestampFromNumbers = (day, month, year) => new Date(`${month} ${day} ${year}`);

/**
 * formatDate
 * Format a date with a provided date format, or default format.
 * @param {String} Timestamp
 * @param {String} Date format
 * @returns {String} Formatted date
 */
export const formatDate = (timestamp, dateFormat = DATE_FORMAT.DEFAULT) => format(new Date(timestamp), dateFormat);
