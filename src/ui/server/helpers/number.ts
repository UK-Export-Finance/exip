const isNumber = (value: string | number) => !Number.isNaN(Number(value));

const numberHasDecimal = (value: number) => String(value).includes('.');

const getPercentageOfNumber = (percent: number, total: number) =>
  ((percent / 100) * total).toFixed(2);

export {
  isNumber,
  numberHasDecimal,
  getPercentageOfNumber,
};
