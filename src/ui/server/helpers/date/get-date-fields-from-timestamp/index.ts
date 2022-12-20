import { getDate, getMonth, getYear } from 'date-fns';

/**
 * getDateFieldsFromTimestamp
 * Generate an object with day/month/year, prefixed with the provided field ID
 * @param {Date} Timestamp
 * @param {String} Field ID
 * @returns {Object} Object with day/month/year, prefixed with the provided field ID
 */
const getDateFieldsFromTimestamp = (timestamp: Date, fieldId: string): object => {
  if (timestamp && fieldId) {
    const date = new Date(timestamp);

    const day = getDate(date);
    const month = getMonth(date) + 1;
    const year = getYear(date);

    return {
      [`${fieldId}-day`]: day,
      [`${fieldId}-month`]: month,
      [`${fieldId}-year`]: year,
    };
  }

  return {};
};

export default getDateFieldsFromTimestamp;
