import mapCurrenciesAsSelectOptions from '.';
import getSupportedCurrencies from '../map-supported-currencies';
import sortArrayAlphabetically from '../../../sort-array-alphabetically';
import mapSelectOption from '../../map-select-option';
import { mockCurrencies } from '../../../../test-mocks';

describe('server/helpers/mappings/map-currencies/as-select-options', () => {
  const supportedCurrencies = getSupportedCurrencies(mockCurrencies);

  const renderValueInText = true;

  it('should return an array of mapped objects from mapSelectOption and with a default option', () => {
    const result = mapCurrenciesAsSelectOptions(supportedCurrencies);

    const expectedSorted = sortArrayAlphabetically(
      supportedCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText)),
      'text',
    );

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      ...expectedSorted,
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    it('should return an array of mapped objects from mapSelectOption and no default option', () => {
      const mockSelectedValue = mockCurrencies[1].isoCode;

      const result = mapCurrenciesAsSelectOptions(mockCurrencies, mockSelectedValue);

      const expected = sortArrayAlphabetically(
        supportedCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText, mockSelectedValue)),
        'text',
      );

      expect(result).toEqual(expected);
    });
  });
});
