import { Country } from '../../../types';

/**
 * getCountryByIsoCode
 * Get a country by ISO code
 * @param {Array} Countries
 * @param {String} Country ISO code
 * @returns {Object} Country
 */
const getCountryByIsoCode = (countries: Array<Country>, isoCode: string) => {
  const countryByIsoCode = countries.find((country) => country.isoCode === isoCode);

  return {
    isoCode: countryByIsoCode?.isoCode,
    name: countryByIsoCode?.name,
  };
};

export default getCountryByIsoCode;
