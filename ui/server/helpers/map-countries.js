const mapCountries = (countries) =>
  countries.map(({ marketName, isoCode }) => ({
    name: marketName,
    value: `country:${isoCode}`,
  }));

module.exports = mapCountries;
