const { describe } = require('eslint/lib/rule-tester/rule-tester');
const mapCurrencies = require('./map-currencies');

describe('sever/helpers/map-currencies', () => {
  const mockCurrencies = [
    {
      name: 'Euros',
      isoCode: 'EUR',
    },
    {
      name: 'Hong Kong Dollars',
      isoCode: 'HKD',
    },
  ];

  it('should return an array of mapped objects with a default option', () => {
    const result = mapCurrencies(mockCurrencies);

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      {
        text: `${mockCurrencies[0].isoCode} - ${mockCurrencies[0].name}`,
        value: mockCurrencies[0].isoCode,
      },
      {
        text: `${mockCurrencies[1].isoCode} - ${mockCurrencies[1].name}`,
        value: mockCurrencies[1].isoCode,
      },
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    it('should return an array of mapped objects with selected option and no default option', () => {
      const mockSelectedValue = mockCurrencies[1].isoCode;

      const result = mapCurrencies(mockCurrencies, mockSelectedValue);

      const expected = [
        {
          text: `${mockCurrencies[0].isoCode} - ${mockCurrencies[0].name}`,
          value: mockCurrencies[0].isoCode,
        },
        {
          text: `${mockCurrencies[1].isoCode} - ${mockCurrencies[1].name}`,
          value: mockCurrencies[1].isoCode,
          selected: true,
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
