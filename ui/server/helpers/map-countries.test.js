const mapCountries = require('./map-countries');

describe('sever/helpers/map-countries', () => {
  it('should returns array of mapped objects', () => {
    const mockCountries = [
      {
        marketName: 'Abu Dhabi',
        isoCode: 'XAD',
      },
    ];

    const result = mapCountries(mockCountries);

    const expected = [
      {
        name: mockCountries[0].marketName,
        value: `country:${mockCountries[0].isoCode}`,
      },
    ];

    expect(result).toEqual(expected);
  });
});
