const formatCurrency = (number: number, currencyCode: string): string =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
  });

export default formatCurrency;
