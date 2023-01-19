import { Country } from '../../../types';

/**
 * getCountryByIsoCode
 * Get a country by ISO code
 * @param {Array} Countries
 * @param {String} Country ISO code
 * @returns {Object} Country
 */
const getCountryByIsoCode = (countries: Array<Country>, isoCode: string) => {
  const country = countries.find((country) => country.isoCode === isoCode);

  return {
    isoCode: country?.isoCode,
    name: country?.name,
  };
};

export default getCountryByIsoCode;
