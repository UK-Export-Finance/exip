import getCountryByName from './get-country-by-name';

describe('server/helpers/get-country-by-name', () => {
  it('should return a mapped object', () => {
    const mockCountries = [
      {
        isoCode: 'A',
        name: 'Mock A',
        isSupported: true,
        riskCategory: 'Standard',
        selected: false,
        value: 'A',
      },
      {
        isoCode: 'B',
        name: 'Mock B',
        isSupported: true,
        riskCategory: 'Standard',
        selected: false,
        value: 'B',
      },
    ];

    const result = getCountryByName(mockCountries, 'Mock B');

    const expected = mockCountries[1];

    expect(result).toEqual(expected);
  });
});
