import { Country } from '../../types';

/**
 * getCountryByIsoCode
 * Get a country by ISO code
 * @param {Array} countries
 * @param {String} isoCode: Country ISO code
 * @returns {Object} Country
 */
const getCountryByIsoCode = (countries: Array<Country>, isoCode: string): Country => {
  const country = countries.find((c) => c.isoCode === isoCode) as Country;

  return country;
};

export default getCountryByIsoCode;
