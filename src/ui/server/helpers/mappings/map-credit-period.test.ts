import mapCreditPeriod from './map-credit-period';

describe('server/helpers/mappings/map-credit-period', () => {
  const mockOptions = [
    {
      value: '1',
      text: '1 month',
    },
    {
      value: '2',
      text: '2 months',
    },
  ];

  describe('mapCreditPeriod', () => {
    it('should return an array of mapped objects with a default option', () => {
      const result = mapCreditPeriod(mockOptions);

      const expected = [
        {
          disabled: true,
          selected: true,
          value: '',
        },
        {
          text: mockOptions[0].text,
          value: mockOptions[0].value,
        },
        {
          text: mockOptions[1].text,
          value: mockOptions[1].value,
        },
      ];

      expect(result).toEqual(expected);
    });

    describe('when a selectedValue is passed', () => {
      it('should return an array of mapped objects with selected option and no default option', () => {
        const mockSelectedValue = mockOptions[1].value;

        const result = mapCreditPeriod(mockOptions, mockSelectedValue);

        const expected = [
          {
            text: mockOptions[0].text,
            value: mockOptions[0].value,
          },
          {
            text: mockOptions[1].text,
            value: mockOptions[1].value,
            selected: true,
          },
        ];

        expect(result).toEqual(expected);
      });
    });
  });
});
