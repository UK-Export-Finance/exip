const mapCurrencies = (currencies, selectedValue) => {
  const mapped = currencies.map(({ name, isoCode }) => {
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

module.exports = mapCurrencies;
