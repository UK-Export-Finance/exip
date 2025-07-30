/**
 * getDaysInAMonth
 * Get the total days of a provided month.
 * @param {number} month
 * @param {number} year
 * @returns {number} Days in the month
 */
const getDaysInAMonth = (month: number, year: number) => {
  const day = 0;

  const daysInMonth = new Date(year, month, day).getDate();

  return daysInMonth;
};

export default getDaysInAMonth;
