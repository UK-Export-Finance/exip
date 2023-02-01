/**
 * createTimestampFromNumbers
 * Create a date from day, month
 * Adds a default year of this year
 * @param {Number} day
 * @param {Number} month
 * @returns {Date}
 */
const createFullTimestampFromDayAndMonth = (day: string, month: string): Date | null => {
  if (day && month) {
    return new Date(`${new Date().getFullYear()}-${month}-${day}`);
  }

  return null;
};

export default createFullTimestampFromDayAndMonth;
