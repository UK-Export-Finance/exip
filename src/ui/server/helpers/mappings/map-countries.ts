import mapSelectOption from './map-select-option';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { Country } from '../../../types';

/**
 * mapCountries
 * Map all countries into the required structure for GOV select component.
 * @param {Array} Array of currency objects
 * @returns {String} Selected credit period value
 * @returns {Array} Array of mapped countries, ordered alphabetically
 */
const mapCountries = (countries: Array<Country>, selectedValue?: string) => {
  const mapped = countries.map(({ name, isoCode }) => mapSelectOption(name, isoCode, false, selectedValue));

  const sortedCountries = sortArrayAlphabetically(mapped, 'text');

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...sortedCountries];

    return result;
  }

  return sortedCountries;
};

export default mapCountries;
