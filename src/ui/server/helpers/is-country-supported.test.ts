import isCountrySupported from './is-country-supported';

describe('server/helpers/is-country-supported', () => {
  const mockCountry = {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    isSupported: true,
    riskCategory: 'Standard',
    selected: false,
    value: 'XAD',
  };

  describe('when a country has isSupported flag', () => {
    it('should return true', () => {
      const result = isCountrySupported(mockCountry);

      expect(result).toEqual(true);
    });
  });

  describe('when a country does NOT have isSupported flag', () => {
    it('should return false', () => {
      mockCountry.isSupported = false;

      const result = isCountrySupported(mockCountry);

      expect(result).toEqual(false);
    });
  });
});
