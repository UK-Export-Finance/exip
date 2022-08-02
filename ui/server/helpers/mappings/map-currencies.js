const { SUPPORTED_CURRENCIES } = require('../../constants');
const sortArrayAlphabetically = require('../sort-array-alphabetically');

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

  const sorted = sortArrayAlphabetically(mapped, 'text');

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [
      defaultOption,
      ...sorted,
    ];

    return result;
  }

  const result = sorted;

  return result;
};

module.exports = {
  getSupportedCurrencies,
  mapCurrencies,
};
