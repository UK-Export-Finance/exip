import { Country } from '../../../types';

/**
 * getCountryByIsoCode
 * Get a country by ISO code
 * @param {Array} Countries
 * @param {String} Country ISO code
 * @returns {Object} Country
 */
const getCountryByIsoCode = (countries: Array<Country>, isoCode: string): Country => {
  const countryByIsoCode = countries.find((country) => country.isoCode === isoCode) as Country;

  return countryByIsoCode;
};

export default getCountryByIsoCode;
