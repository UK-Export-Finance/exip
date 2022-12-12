import { Country } from '../../../types';

/**
 * mapCountry
 * Map country answer to a simple name string
 * @param {Object} Country
 * @returns {String} Country name
 */
const mapCountry = (countryObj: Country) => countryObj.name;

export default mapCountry;
