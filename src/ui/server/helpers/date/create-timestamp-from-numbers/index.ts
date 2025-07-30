/**
 * createTimestampFromNumbers
 * Create a date from day, month and year numbers
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @returns {Date}
 */
const createTimestampFromNumbers = (day: number, month: number, year: number): Date | null => {
  if (day && month && year) {
    return new Date(`${month} ${day} ${year}`);
  }

  return null;
};

export default createTimestampFromNumbers;
