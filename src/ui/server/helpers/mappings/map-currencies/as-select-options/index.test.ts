import mapCurrenciesAsSelectOptions from '.';
import mapSelectOption from '../../map-select-option';
import { mockCurrencies } from '../../../../test-mocks';

describe('server/helpers/mappings/map-currencies/as-select-options', () => {
  const renderValueInText = true;

  it('should return an array of mapped objects from mapSelectOption and with a default option', () => {
    const result = mapCurrenciesAsSelectOptions(mockCurrencies);

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      ...mockCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText)),
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    it('should return an array of mapped objects from mapSelectOption and no default option', () => {
      const mockSelectedValue = mockCurrencies[1].isoCode;

      const result = mapCurrenciesAsSelectOptions(mockCurrencies, mockSelectedValue);

      const expected = mockCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText, mockSelectedValue));

      expect(result).toEqual(expected);
    });
  });
});
