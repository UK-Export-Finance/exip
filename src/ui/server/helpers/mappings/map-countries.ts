import mapSelectOption from './map-select-option';
import { Country } from '../../../types';

/**
 * mapCountries
 * Map all countries into the required structure for GOV select component.
 * @param {Array} Array of currency objects
 * @returns {String} Selected credit period value
 * @returns {Array} Array of mapped currencies
 */
const mapCountries = (countries: Array<Country>, selectedValue?: string) => {
  const mapped = countries.map(({ name, isoCode }) => mapSelectOption(name, isoCode, false, selectedValue));

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...mapped];

    return result;
  }

  const result = mapped;

  return result;
};

export default mapCountries;
