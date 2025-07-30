import { getDate, getMonth, getYear } from 'date-fns';
import { ObjectType } from '../../../../types';

/**
 * getDateFieldsFromTimestamp
 * Generate an object with day/month/year, prefixed with the provided field ID
 * @param {Date} Timestamp
 * @param {string} fieldId: Field ID
 * @returns {ObjectType} Object with day/month/year, prefixed with the provided field ID
 */
const getDateFieldsFromTimestamp = (timestamp: Date, fieldId: string): ObjectType => {
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
