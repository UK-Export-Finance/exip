const mapCountries = (countries, selectedValue) =>
  countries.map(({ marketName, isoCode }) => {
    const country = {
      name: marketName,
      value: isoCode,
    };

    if (selectedValue && country.name === selectedValue) {
      country.selected = true;
    }

    return country;
  });

module.exports = mapCountries;
