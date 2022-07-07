const {
  mapActiveFlag,
  mapCountry,
  mapCountries,
} = require('./map-countries');
const sortArrayAlphabetically = require('./sort-array-alphabetically');

describe('server/helpers/map-countries', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      active: 'Y',
      oecdRiskCategory: 1,
    },
    {
      marketName: 'France',
      isoCode: 'FRA',
      active: 'N',
      oecdRiskCategory: 2,
    },
  ];

  describe('mapActiveFlag', () => {
    describe('when active is `Y`', () => {
      it('should return true', () => {
        const result = mapActiveFlag('Y');

        expect(result).toEqual(true);
      });
    });

    describe('when active is `N`', () => {
      it('should return false', () => {
        const result = mapActiveFlag('N');

        expect(result).toEqual(false);
      });
    });

    describe('when there is no active value', () => {
      it('should return false', () => {
        const result = mapActiveFlag();

        expect(result).toEqual(false);
      });
    });
  });

  describe('mapCountry', () => {
    it('should return an object', () => {
      const result = mapCountry(mockCountries[0]);

      const expected = {
        name: mockCountries[0].marketName,
        isoCode: mockCountries[0].isoCode,
        value: mockCountries[0].isoCode,
        active: mapActiveFlag(mockCountries[0].active),
        riskCategory: mockCountries[0].oecdRiskCategory,
      };

      expect(result).toEqual(expected);
    });

    describe('when a selectedIsoCode is passed', () => {
      it('should return an object with selected option', () => {
        const mockSelectedIsoCode = mockCountries[0].isoCode;

        const result = mapCountry(mockCountries[0], mockSelectedIsoCode);

        const expected = {
          name: mockCountries[0].marketName,
          isoCode: mockCountries[0].isoCode,
          value: mockCountries[0].isoCode,
          active: mapActiveFlag(mockCountries[0].active),
          riskCategory: mockCountries[0].oecdRiskCategory,
          selected: true,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapCountries', () => {
    it('should returns array of mapped, sorted objects', () => {
      const mockSelectedIsoCode = mockCountries[0].isoCode;

      const result = mapCountries(mockCountries, mockSelectedIsoCode);

      const expected = sortArrayAlphabetically([
        mapCountry(mockCountries[0], mockSelectedIsoCode),
        mapCountry(mockCountries[1], mockSelectedIsoCode),
      ], 'name');

      expect(result).toEqual(expected);
    });
  });
});
