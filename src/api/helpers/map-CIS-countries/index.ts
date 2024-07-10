import { EXTERNAL_API_DEFINITIONS } from '../../constants';
import filterCisEntries from '../filter-cis-entries';
import mapCisCountry from './map-CIS-country';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, MappedCisCountry } from '../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * mapCisCountries
 * Map and sort CIS countries.
 * 1) Filter out invalid CIS countries.
 * 2) Map the countries into a cleaner structure.
 * 3) Sort the countries alphabetically.
 * @param {Array<CisCountry>} Array of CIS Countries
 * @returns {Array<MappedCisCountry>} Array of mapped countries
 */
const mapCisCountries = (countries: Array<CisCountry>): Array<MappedCisCountry> => {
  const filteredCountries = filterCisEntries(countries, CIS.INVALID_COUNTRIES, 'marketName') as Array<CisCountry>;

  const mapped = filteredCountries.map((country) => mapCisCountry(country));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};

export default mapCisCountries;
