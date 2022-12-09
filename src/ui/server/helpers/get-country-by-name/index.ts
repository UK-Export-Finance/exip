import { Country } from '../../../types';

/**
 * getCountryByName
 * Get a country by name
 * @param {Array} Countries
 * @param {String} Country name
 * @returns {Object} Country
 */
const getCountryByName = (countries: Array<Country>, countryName: string) => {
  const country = countries.find((c) => c.name === countryName);

  return country;
};

export default getCountryByName;
