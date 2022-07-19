const isCountrySupported = require('./is-country-supported');

describe('server/helpers/is-country-supported', () => {
  const mockCountry = {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    isSupported: true,
  };

  describe('mock unsupported countries', () => {
    describe('when country is `Angola`', () => {
      it('should return false', () => {
        const result = isCountrySupported({
          ...mockCountry,
          isoCode: 'AGO',
          name: 'Angola',
        });

        expect(result).toEqual(false);
      });
    });
  });

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
