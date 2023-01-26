import mapCountries from './map-countries';
import mapSelectOption from './map-select-option';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { mockCountries } from '../../test-mocks';

describe('server/helpers/mappings/map-countries', () => {
  it('should return an array of mapped objects from mapSelectOption and with a default option', () => {
    const result = mapCountries(mockCountries);

    const mapped = mockCountries.map(({ name, isoCode }) => mapSelectOption(name, isoCode, false));

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      ...sortArrayAlphabetically(mapped, 'text'),
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    it('should return an array of mapped objects from mapSelectOption and no default option', () => {
      const mockSelectedValue = mockCountries[1].isoCode;

      const result = mapCountries(mockCountries, mockSelectedValue);

      const mapped = mockCountries.map(({ name, isoCode }) => mapSelectOption(name, isoCode, false, mockSelectedValue));

      const expected = sortArrayAlphabetically(mapped, 'text');

      expect(result).toEqual(expected);
    });
  });
});
