import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry } from '../../../types';
import { filterCisCountries } from './map-countries';
/**
 * mapCountries
 * Map all CIS countries to cleaner structure
 * @param {Array} Array of CIS Countries
 * @returns {String} Selected country ISO code
 * @returns {Array} Array of mapped countries
 */
export const mapCountriesSelect = (countries: Array<CisCountry>, selectedIsoCode?: string) => {
  const filteredCountries = filterCisCountries(countries);

  const mapped = filteredCountries.map(({ marketName, isoCode }) => {
    if (selectedIsoCode && selectedIsoCode === isoCode) {
      return {
        text: marketName,
        value: isoCode,
        selected: true,
      };
    }
    return {
      text: marketName,
      value: isoCode,
    };
  });
  const sorted = sortArrayAlphabetically(mapped, 'text');

  if (!selectedIsoCode) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...sorted];

    return result;
  }

  return sorted;
};
