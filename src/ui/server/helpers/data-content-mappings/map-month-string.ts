/**
 * mapMonthString
 * Map credit period answer to a month/s string
 * @param {number} Credit period
 * @returns {string} Credit period with month/s string
 */
const mapMonthString = (answer: number) => (answer === 1 ? `${answer} month` : `${answer} months`);

export default mapMonthString;
