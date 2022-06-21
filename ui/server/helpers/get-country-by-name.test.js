const getCountryByName = require('./get-country-by-name');

describe('sever/helpers/get-country-by-name', () => {
  it('should return a mapped object', () => {
    const mockCountries = [
      { isoCode: 'A', name: 'Mock A' },
      { isoCode: 'B', name: 'Mock B' },
    ];

    const result = getCountryByName(mockCountries, 'Mock B');

    const expected = {
      name: mockCountries[1].name,
      isoCode: mockCountries[1].isoCode,
    };

    expect(result).toEqual(expected);
  });
});
