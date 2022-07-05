/**
 * mockUnsupportedCountries
 * Mock unsupported countries for user testing scenarios
 */
const mockUnsupportedCountries = [
  {
    isoCode: 'AGO',
    name: 'Angola',
  },
];

const isCountrySupported = (country) => {
  const isMockUnsupported = mockUnsupportedCountries.find((c) =>
    c.isoCode === country.isoCode);

  if (isMockUnsupported) {
    return false;
  }

  if (country.active === true) {
    return true;
  }

  return false;
};

module.exports = isCountrySupported;
