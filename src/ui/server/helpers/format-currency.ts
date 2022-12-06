const formatCurrency = (number: number, currencyCode: string, decimalPoints: number): string =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPoints,
    maximumFractionDigits: decimalPoints,
  });

export default formatCurrency;
