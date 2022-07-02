const { SUPPORTED_CURRENCIES } = require('../constants');

const getSupportedCurrencies = (currencies) => {
  const supported = currencies.filter((currency) =>
    SUPPORTED_CURRENCIES.find((currencyCode) => currency.isoCode === currencyCode));

  return supported;
};

const mapCurrencies = (currencies, selectedValue) => {
  const supportedCurrencies = getSupportedCurrencies(currencies);

  const mapped = supportedCurrencies.map(({ name, isoCode }) => {
    if (selectedValue && selectedValue === isoCode) {
      return {
        text: `${isoCode} - ${name}`,
        value: isoCode,
        selected: true,
      };
    }

    return {
      text: `${isoCode} - ${name}`,
      value: isoCode,
    };
  });

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [
      defaultOption,
      ...mapped,
    ];

    return result;
  }

  const result = mapped;

  return result;
};

module.exports = {
  getSupportedCurrencies,
  mapCurrencies,
};
