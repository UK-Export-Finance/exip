const formatCurrency = (str) => Number(str).toLocaleString('en', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
});

export default formatCurrency;
