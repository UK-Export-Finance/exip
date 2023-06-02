import mapPercentage from '../map-percentage';
import mapPercentageOfCover from './map-percentage-of-cover';

describe('server/helpers/mappings/map-percentage-of-cover', () => {
  const mockPercentages = [80, 85, 90, 95];

  describe('mapCurrencies', () => {
    it('should return an array of mapped objects with a default option', () => {
      const result = mapPercentageOfCover(mockPercentages);

      const expected = [
        {
          disabled: true,
          selected: true,
          value: '',
        },
        {
          text: mapPercentage(mockPercentages[0]),
          value: mockPercentages[0],
        },
        {
          text: mapPercentage(mockPercentages[1]),
          value: mockPercentages[1],
        },
        {
          text: mapPercentage(mockPercentages[2]),
          value: mockPercentages[2],
        },
        {
          text: mapPercentage(mockPercentages[3]),
          value: mockPercentages[3],
        },
      ];

      expect(result).toEqual(expected);
    });

    describe('when a selectedValue is passed', () => {
      it('should return an array of mapped objects with selected option and no default option', () => {
        const { 1: mockSelectedValue } = mockPercentages;

        const result = mapPercentageOfCover(mockPercentages, mockSelectedValue);

        const expected = [
          {
            text: mapPercentage(mockPercentages[0]),
            value: mockPercentages[0],
          },
          {
            text: mapPercentage(mockPercentages[1]),
            value: mockPercentages[1],
            selected: true,
          },
          {
            text: mapPercentage(mockPercentages[2]),
            value: mockPercentages[2],
          },
          {
            text: mapPercentage(mockPercentages[3]),
            value: mockPercentages[3],
          },
        ];

        expect(result).toEqual(expected);
      });
    });
  });
});
