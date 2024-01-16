import mapCurrencies from './map-currencies';
import mapSelectOption from './map-select-option';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { mockCurrencies } from '../../test-mocks';

describe('server/helpers/mappings/map-currencies', () => {
  it('should return an array of mapped objects from mapSelectOption and with a default option', () => {
    const result = mapCurrencies(mockCurrencies);

    const mapped = mockCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true));

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
      const mockSelectedValue = mockCurrencies[1].isoCode;

      const result = mapCurrencies(mockCurrencies, mockSelectedValue);

      const mapped = mockCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true, mockSelectedValue));

      const expected = sortArrayAlphabetically(mapped, 'text');

      expect(result).toEqual(expected);
    });
  });
});
