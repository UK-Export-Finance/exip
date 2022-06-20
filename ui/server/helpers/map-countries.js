const mapCountries = (countries, selectedIsoCode) =>
  countries.map(({ marketName, isoCode }) => {
    const country = {
      name: marketName,
      value: isoCode,
    };

    if (selectedIsoCode && isoCode === selectedIsoCode) {
      country.selected = true;
    }

    return country;
  });

module.exports = mapCountries;
