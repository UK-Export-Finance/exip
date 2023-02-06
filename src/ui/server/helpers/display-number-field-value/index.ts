/**
 * helper to return number field value for mapping
 * if number is 0, then will make 0 a string so can be displayed
 * @param {Number} value
 * @returns value - either number or string or null
 */
const displayNumberFieldValue = (value?: number) => {
  if (value === 0) {
    return String(value);
  }

  return value;
};

export default displayNumberFieldValue;
