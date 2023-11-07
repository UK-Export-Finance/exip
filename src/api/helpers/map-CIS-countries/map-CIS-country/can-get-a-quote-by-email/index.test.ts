import canGetAQuoteByEmail from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';
import mockCountries from '../../../../test-mocks/mock-countries';
import { MappedCisCountry } from '../../../../types';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const validMockCountry = {
  ...mockCountries[0],
  riskCategory: RISK.STANDARD,
  shortTermCover: true,
  nbiIssueAvailable: false,
} as MappedCisCountry;

describe('helpers/map-cis-countries/map-cis-country/can-get-a-quote-by-email', () => {
  describe('when a country has true riskCategory, shortTermCover and no nbiIssueAvailable', () => {
    it('should return true', () => {
      const result = canGetAQuoteByEmail(validMockCountry);

      expect(result).toEqual(true);
    });
  });

  describe('when a country does not have riskCategory', () => {
    it('should return false', () => {
      const mockCountry = {
        ...validMockCountry,
        riskCategory: undefined,
      } as MappedCisCountry;

      const result = canGetAQuoteByEmail(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('when a country does not have shortTermCover', () => {
    it('should return false', () => {
      const mockCountry = {
        ...validMockCountry,
        shortTermCover: false,
      } as MappedCisCountry;

      const result = canGetAQuoteByEmail(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('when a country has nbiIssueAvailable', () => {
    it('should return false', () => {
      const mockCountry = {
        ...validMockCountry,
        nbiIssueAvailable: true,
      } as MappedCisCountry;

      const result = canGetAQuoteByEmail(mockCountry);

      expect(result).toEqual(false);
    });
  });
});
