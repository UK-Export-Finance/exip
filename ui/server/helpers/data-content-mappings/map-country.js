const mapCountry = (countryObj) => {
  if (countryObj && countryObj.name) {
    return countryObj.name;
  }

  return '-';
};

module.exports = mapCountry;
