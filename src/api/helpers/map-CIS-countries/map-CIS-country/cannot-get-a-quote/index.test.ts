import cannotGetAQuote from '.';
import mockCountries from '../../../../test-mocks/mock-countries';
import { MappedCisCountry } from '../../../../types';

const mockCountryCannotGetAQuote = {
  ...mockCountries[0],
  shortTermCover: false,
  nbiIssueAvailable: false,
} as MappedCisCountry;

describe('helpers/map-cis-countries/map-cis-country/cannot-get-a-quote', () => {
  describe('when country does not have riskCategory, shortTermCover and nbiIssueAvailable', () => {
    it('should return true', () => {
      const result = cannotGetAQuote(mockCountryCannotGetAQuote);

      expect(result).toEqual(true);
    });
  });

  describe('when country does not have riskCategory, but has shortTermCover and nbiIssueAvailable', () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryCannotGetAQuote,
        shortTermCover: true,
        nbiIssueAvailable: true,
      };
      const result = cannotGetAQuote(mockCountry);

      expect(result).toEqual(true);
    });
  });

  describe('when country has riskCategory, but not shortTermCover and nbiIssueAvailable', () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryCannotGetAQuote,
        riskCategory: 'Mock',
      };
      const result = cannotGetAQuote(mockCountry);

      expect(result).toEqual(true);
    });
  });

  describe('when country has riskCategory, shortTermCover and nbiIssueAvailable', () => {
    it('should return false', () => {
      const mockCountry = {
        ...mockCountryCannotGetAQuote,
        riskCategory: 'Mock',
        shortTermCover: true,
        nbiIssueAvailable: true,
      };

      const result = cannotGetAQuote(mockCountry);

      expect(result).toEqual(false);
    });
  });
});
