const sortArrayAlphabetically = require('./sort-array-alphabetically');

const mapActiveFlag = (active) => {
  if (active === 'Y') {
    return true;
  }

  return false;
};

const mapCountry = (country, selectedIsoCode) => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    value: country.isoCode,
    active: mapActiveFlag(country.active),
  };

  if (selectedIsoCode && country.isoCode === selectedIsoCode) {
    mapped.selected = true;
  }

  return mapped;
};

const mapCountries = (countries, selectedIsoCode) => {
  const mapped = countries.map((country) => mapCountry(country, selectedIsoCode));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};

module.exports = {
  mapActiveFlag,
  mapCountry,
  mapCountries,
};
