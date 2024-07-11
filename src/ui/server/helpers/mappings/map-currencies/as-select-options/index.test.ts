import mapCurrenciesAsSelectOptions from '.';
import mapAndSortCurrencies from './map-and-sort-currencies';
import { mockCurrencies } from '../../../../test-mocks';

describe('server/helpers/mappings/map-currencies/as-select-options', () => {
  it('should return an array of mapped objects from mapAndSortCurrencies function', () => {
    const result = mapCurrenciesAsSelectOptions(mockCurrencies);

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      ...mapAndSortCurrencies(mockCurrencies),
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    const mockSelectedValue = mockCurrencies[1].isoCode;

    it('should return an array of mapped objects from mapSelectOption and no default option', () => {
      const result = mapCurrenciesAsSelectOptions(mockCurrencies, mockSelectedValue);

      const expected = mapAndSortCurrencies(mockCurrencies, mockSelectedValue);

      expect(result).toEqual(expected);
    });
  });
});
