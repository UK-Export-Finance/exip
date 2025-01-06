import canGetAQuoteOnline from '.';
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
  nbiIssueAvailable: true,
} as MappedCisCountry;

describe('helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online', () => {
  describe('when a country has true riskCategory, shortTermCover and nbiIssueAvailable', () => {
    it('should return true', () => {
      const result = canGetAQuoteOnline(validMockCountry);

      expect(result).toEqual(true);
    });
  });

  describe('when a country does not have riskCategory', () => {
    it('should return false', () => {
      const mockCountry = {
        ...validMockCountry,
        riskCategory: undefined,
      } as MappedCisCountry;

      const result = canGetAQuoteOnline(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('when a country does not have shortTermCover', () => {
    it('should return false', () => {
      const mockCountry = {
        ...validMockCountry,
        shortTermCover: false,
      } as MappedCisCountry;

      const result = canGetAQuoteOnline(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('when a country does not have nbiIssueAvailable', () => {
    it('should return false', () => {
      const mockCountry = {
        ...validMockCountry,
        nbiIssueAvailable: false,
      } as MappedCisCountry;

      const result = canGetAQuoteOnline(mockCountry);

      expect(result).toEqual(false);
    });
  });
});
