import getSupportedCurrencies from '.';
import { mockCurrencies } from '../../../test-mocks';

describe('server/helpers/mappings/map-currencies/index', () => {
  it('should only return supported currencies (GBP, EUR, USD)', () => {
    const result = getSupportedCurrencies(mockCurrencies);

    const expected = [mockCurrencies[0], mockCurrencies[2], mockCurrencies[3]];

    expect(result).toEqual(expected);
  });
});
