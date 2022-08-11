import getCurrencyByCode from './get-currency-by-code';

describe('server/helpers/get-currency-by-code', () => {
  it('should return a mapped object', () => {
    const mockCurrencies = [
      { isoCode: 'A', name: 'Mock' },
      { isoCode: 'B', name: 'Mock' },
    ];

    const result = getCurrencyByCode(mockCurrencies, 'B');

    expect(result).toEqual(mockCurrencies[1]);
  });
});
