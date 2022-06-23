const isNumber = (value) => Number.isInteger(value);

const numberHasDecimal = (value) => String(value).includes('.');

module.exports = {
  isNumber,
  numberHasDecimal,
};
