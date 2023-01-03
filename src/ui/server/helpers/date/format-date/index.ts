import { format } from 'date-fns';

/**
 * formatDate
 * Format a date for design requirement e.g 29 December 2022
 * @param {Date} Timestamp
 * @returns {String} Formatted date
 */
const formatDate = (timestamp: Date): string => format(new Date(timestamp), 'd MMMM yyyy');

export default formatDate;
