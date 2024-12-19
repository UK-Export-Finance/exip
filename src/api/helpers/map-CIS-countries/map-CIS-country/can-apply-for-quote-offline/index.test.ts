import canApplyForAQuoteOffline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import mockCountries from '../../../../test-mocks/mock-countries';

const { CIS } = EXTERNAL_API_DEFINITIONS;

const { 1: mockCountryBase } = mockCountries;

describe('helpers/map-cis-countries/map-cis-country/can-apply-offline', () => {
  describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER.ILC}`, () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER.ILC,
      };

      const result = canApplyForAQuoteOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(true);
    });
  });

  describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER.CILC}`, () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER.CILC,
      };

      const result = canApplyForAQuoteOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(true);
    });
  });

  describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER.REFER}`, () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER.REFER,
      };

      const result = canApplyForAQuoteOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCoverAvailabilityDesc does not match anything', () => {
    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: 'Something else',
      };

      const result = canApplyForAQuoteOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(false);
    });
  });
});
