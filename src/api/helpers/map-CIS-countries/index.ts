import { EXTERNAL_API_DEFINITIONS } from '../../constants';
import mapCisCountry from './map-CIS-country';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, MappedCisCountry } from '../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * filterCisCountries
 * Filter out countries from CIS API that have an invalid name
 * @param {Array<CisCountry>} All CIS countries
 * @returns {Array} CIS countries without invalid country names
 */
export const filterCisCountries = (countries: Array<CisCountry>) => countries.filter((country) => !CIS.INVALID_COUNTRIES.includes(country.marketName));

/**
 * mapCisCountries
 * Map all CIS countries to cleaner structure
 * @param {Array<CisCountry>} Array of CIS Countries
 * @returns {Array<MappedCisCountry>} Array of mapped countries
 */
export const mapCisCountries = (countries: Array<CisCountry>): Array<MappedCisCountry> => {
  const filteredCountries = filterCisCountries(countries);

  const mapped = filteredCountries.map((country) => mapCisCountry(country));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};

export default mapCisCountries;
