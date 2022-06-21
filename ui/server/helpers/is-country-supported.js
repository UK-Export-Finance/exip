const isCountrySupported = (country) => {
  if (country.active === true) {
    return true;
  }

  return false;
};

module.exports = isCountrySupported;
