import { canGetAQuoteOnline, canGetAQuoteByEmail, cannotGetAQuote } from '.';

describe('server/helpers/country-support', () => {
  const mockCountryBase = {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    value: 'XAD',
    riskCategory: 'Standard',
  };

  describe('canGetAQuoteOnline', () => {
    describe('when country has riskCategory, shortTermCoverAvailable and nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCoverAvailable: true,
          nbiIssueAvailable: true,
        };

        const result = canGetAQuoteOnline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailable: false,
        nbiIssueAvailable: true,
      };

      const result = canGetAQuoteOnline(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('canGetAQuoteByEmail', () => {
    describe('when country has riskCategory, shortTermCoverAvailable but no nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCoverAvailable: true,
          nbiIssueAvailable: false,
        };

        const result = canGetAQuoteByEmail(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailable: true,
        nbiIssueAvailable: true,
      };

      const result = canGetAQuoteByEmail(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('cannotGetAQuote', () => {
    describe('when country does not have riskCategory, shortTermCoverAvailable and nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCoverAvailable: false,
          nbiIssueAvailable: false,
        };

        const result = cannotGetAQuote(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailable: true,
        nbiIssueAvailable: true,
      };

      const result = cannotGetAQuote(mockCountry);

      expect(result).toEqual(false);
    });
  });
});
