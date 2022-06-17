const getCurrencyByCode = (currencies, isoCode) => {
  const currency = currencies.find((c) => c.isoCode === isoCode);

  return {
    isoCode: currency.isoCode,
    name: currency.name,
  };
};

module.exports = getCurrencyByCode;
