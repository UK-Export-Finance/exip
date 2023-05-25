/**
 * formatTimeOfDay
 * Get a time of day string from a date
 * @param {Date}
 * @returns {String} Time of day
 */
const formatTimeOfDay = (date: Date) => {
  const fullDate = new Date(date);

  const hour = fullDate.getHours();

  return `${hour}:${fullDate.getMinutes()}`;
};

export default formatTimeOfDay;
