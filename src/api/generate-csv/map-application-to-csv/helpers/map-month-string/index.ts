/**
 * mapMonthString
 * Map credit period answer to a month/s string
 * @param {Number} Credit period
 * @returns {String} Credit period with month/s string
 */
const mapMonthString = (answer: number) => (answer === 1 ? `${answer} month` : `${answer} months`);

export default mapMonthString;
