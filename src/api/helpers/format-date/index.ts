import { format } from 'date-fns';
import { DATE_FORMAT } from '../../constants';

/**
 * formatDate
 * Format a date for design requirement e.g 29 December 2022
 * @param {Date} timestamp
 * @param {String} dateFormat defaults to 'd MMMM yyyy' unless provided
 * @returns {String} Formatted date
 */
const formatDate = (timestamp: Date, dateFormat = DATE_FORMAT.DEFAULT): string => format(new Date(timestamp), dateFormat);

export default formatDate;
