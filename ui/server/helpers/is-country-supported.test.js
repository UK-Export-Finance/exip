const isCountrySupported = require('./is-country-supported');

describe('server/helpers/is-country-supported', () => {
  const mockCountry = {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    active: true,
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

  describe('when a country has active flag', () => {
    it('should return true', () => {
      const result = isCountrySupported(mockCountry);

      expect(result).toEqual(true);
    });
  });

  describe('when a country does NOT have active flag', () => {
    it('should return false', () => {
      mockCountry.active = false;

      const result = isCountrySupported(mockCountry);

      expect(result).toEqual(false);
    });
  });
});
