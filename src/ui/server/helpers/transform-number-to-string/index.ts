/**
 * helper to return number field value for mapping
 * if number is 0, then will make 0 a string so can be displayed
 * @param {Number} value
 * @returns value - either number or string or null
 */
const transformNumberToString = (value?: number) => (value === 0 ? String(value) : value);

export default transformNumberToString;
