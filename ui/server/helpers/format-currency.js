const formatCurrency = (number, currencyCode) => {
  if (number && currencyCode) {
    return number.toLocaleString('en', {
      style: 'currency',
      currency: currencyCode,
    });
  }

  return null;
};

module.exports = formatCurrency;
