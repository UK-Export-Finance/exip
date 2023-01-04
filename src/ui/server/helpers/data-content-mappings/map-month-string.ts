/**
 * mapMonthString
 * Map credit period answer to a month/s string
 * @param {Number} Credit period
 * @returns {String} Credit period with month/s string
 */
const mapMonthString = (answer: number) => {
  if (answer === 1) {
    return `${answer} month`;
  }

  return `${answer} months`;
};

export default mapMonthString;
