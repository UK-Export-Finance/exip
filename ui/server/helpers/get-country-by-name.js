const getCountryByName = (countries, name) => {
  const country = countries.find((c) => c.marketName === name);

  return {
    isoCode: country.isoCode,
    name: country.marketName,
  };
};

module.exports = getCountryByName;
