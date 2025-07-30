/**
 * createFullTimestampFromDayAndMonth
 * Create a date from day, month
 * Adds a default year of this year
 * @param {string} day
 * @param {string} month
 * @returns {Date}
 */
const createFullTimestampFromDayAndMonth = (day?: string, month?: string): Date | null => {
  if (day && month) {
    return new Date(`${new Date().getFullYear()}-${month}-${day}`);
  }

  return null;
};

export default createFullTimestampFromDayAndMonth;
