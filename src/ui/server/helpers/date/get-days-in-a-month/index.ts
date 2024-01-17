/**
 * getDaysInAMonth
 * Get the total days of a provided month.
 * @param {Integer} month
 * @param {Integer} year
 * @returns {Integer} Days in the month
 */
const getDaysInAMonth = (month: number, year: number) => {
  const day = 0;

  const daysInMonth = new Date(year, month, day).getDate();

  return daysInMonth;
};

export default getDaysInAMonth;
