const formatCurrency = (number, currencyCode) =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
  });

module.exports = formatCurrency;
