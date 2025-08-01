import { Country } from '../../types';

/**
 * getCountryByIsoCode
 * Get a country by ISO code
 * @param {Array<Country>} countries
 * @param {string} isoCode: Country ISO code
 * @returns {Country}
 */
const getCountryByIsoCode = (countries: Array<Country>, isoCode: string): Country => {
  const country = countries.find((c) => c.isoCode === isoCode) as Country;

  return country;
};

export default getCountryByIsoCode;
