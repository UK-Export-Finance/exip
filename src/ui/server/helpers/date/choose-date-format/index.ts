import { format } from 'date-fns';

/**
 * chooseDateFormat
 * Format a date with whichever pattern chosen
 * @param {Date} timestamp
 * @param {String} pattern pattern of format
 * @returns {String} Formatted date
 */
const chooseDateFormat = (timestamp: Date, pattern: string): string => format(new Date(timestamp), pattern);

export default chooseDateFormat;
