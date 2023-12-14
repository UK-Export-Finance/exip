import mapCurrencies from './map-currencies';
import mapSelectOption from './map-select-option';
import { mockCurrencies } from '../../test-mocks';

const mockSelectedValue = mockCurrencies[1].isoCode;
const renderValueInText = true;

describe('server/helpers/mappings/map-currencies', () => {
  it('should return an array of mapped objects from mapSelectOption and with a default option', () => {
    const result = mapCurrencies(mockCurrencies);

    const expectedMappedCurrencies = mockCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText));

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      ...expectedMappedCurrencies,
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    it('should return an array of mapped objects from mapSelectOption and no default option', () => {
      const result = mapCurrencies(mockCurrencies, mockSelectedValue);

      const expected = mockCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText, mockSelectedValue));

      expect(result).toEqual(expected);
    });
  });
});
