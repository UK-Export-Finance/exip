import { Country } from '../../../types';

/**
 * mapCountry
 * Map country answer to a simple name string
 * @param {object} Country
 * @returns {string} Country name
 */
const mapCountry = (countryObj: Country) => countryObj.name;

export default mapCountry;
