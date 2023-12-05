import getSupportedCurrencies from '.';
import { mockCurrencies } from '../../../../test-mocks';

describe('server/helpers/mappings/map-currencies/map-supported-currencies', () => {
  it('should only return supported currencies (GBP, EUR, JPY, USD)', () => {
    const result = getSupportedCurrencies(mockCurrencies);

    const expected = [mockCurrencies[0], mockCurrencies[2], mockCurrencies[3], mockCurrencies[4]];

    expect(result).toEqual(expected);
  });
});
