const mapCountries = (countries) =>
  countries.map(({ marketName, isoCode }) => ({
    name: marketName,
    value: isoCode,
  }));

module.exports = mapCountries;
