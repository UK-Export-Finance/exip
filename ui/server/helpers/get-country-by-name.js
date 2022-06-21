const getCountryByName = (countries, countryName) => {
  const country = countries.find((c) => c.name === countryName);

  return country;
};

module.exports = getCountryByName;
