import mapAndSortCurrencies from '.';
import mapSelectOption from '../../../map-select-option';
import { mockCurrencies, EUR, JPY, GBP, USD } from '../../../../../test-mocks';

const renderValueInText = true;
const mockSelectedValue = mockCurrencies[1].isoCode;

describe('server/helpers/mappings/map-currencies/as-select-options/map-and-sort-currencies', () => {
  it('should return an array of mapped objects from mapSelectOption', () => {
    const result = mapAndSortCurrencies(mockCurrencies, mockSelectedValue);

    const initCurrencies = [GBP, EUR, USD, JPY];

    const expected = initCurrencies.map((currency) => mapSelectOption(currency.name, currency.isoCode, renderValueInText, mockSelectedValue));

    expect(result).toEqual(expected);
  });
});
