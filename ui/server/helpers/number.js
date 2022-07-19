const isNumber = (value) => !Number.isNaN(Number(value));

const numberHasDecimal = (value) => String(value).includes('.');

const getPercentageOfNumber = (percent, total) =>
  ((percent / 100) * total).toFixed(2);

module.exports = {
  isNumber,
  numberHasDecimal,
  getPercentageOfNumber,
};
