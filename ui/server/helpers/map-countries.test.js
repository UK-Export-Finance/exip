const mapCountries = require('./map-countries');

describe('sever/helpers/map-countries', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
    },
    {
      marketName: 'France',
      isoCode: 'FRA',
    },
  ];

  it('should returns array of mapped objects', () => {
    const result = mapCountries(mockCountries);

    const expected = [
      {
        name: mockCountries[0].marketName,
        value: mockCountries[0].isoCode,
      },
      {
        name: mockCountries[1].marketName,
        value: mockCountries[1].isoCode,
      },
    ];

    expect(result).toEqual(expected);
  });

  describe.only('when a selectedIsoCode is passed', () => {
    it('should return an array of mapped objects with selected option', () => {
      const mockSelectedIsoCode = mockCountries[0].isoCode;

      const result = mapCountries(mockCountries, mockSelectedIsoCode);

      const expected = [
        {
          name: mockCountries[0].marketName,
          value: mockCountries[0].isoCode,
          selected: true,
        },
        {
          name: mockCountries[1].marketName,
          value: mockCountries[1].isoCode,
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
