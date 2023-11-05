import formatDate from '../../../../helpers/format-date';
import { DATE_FORMAT } from '../../../../constants';

/**
 * formatTimeOfDay
 * Get a time of day string from a date
 * @param {Date}
 * @returns {String} Time of day
 */
const formatTimeOfDay = (date: Date) => formatDate(date, DATE_FORMAT.HOURS_AND_MINUTES);

export default formatTimeOfDay;
