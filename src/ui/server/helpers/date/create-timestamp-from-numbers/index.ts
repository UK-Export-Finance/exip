/**
 * createTimestampFromNumbers
 * Create a date from day, month and year numbers
 * @param {Number} day
 * @param {Number} month
 * @param {Number} year
 * @returns {Date}
 */
const createTimestampFromNumbers = (day: number, month: number, year: number): Date | null => {
  if (day && month && year) {
    return new Date(`${month} ${day} ${year}`);
  }

  return null;
};

export default createTimestampFromNumbers;
