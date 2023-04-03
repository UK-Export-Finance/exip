/**
 * formatTimeOfDay
 * Get a time of day string from a date
 * @param {Date}
 * @returns {String} Time of day
 */
const formatTimeOfDay = (date: Date) => {
  const fullDate = new Date(date);

  return `${fullDate.getHours()}:${fullDate.getMinutes()}`;
};

export default formatTimeOfDay;
