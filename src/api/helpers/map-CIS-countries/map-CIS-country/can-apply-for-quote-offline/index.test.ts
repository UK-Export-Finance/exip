import canApplyForAQuoteOffline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import mockCountries from '../../../../test-mocks/mock-countries';

const {
  CIS: {
    SHORT_TERM_COVER: { ILC, CILC, REFER },
  },
} = EXTERNAL_API_DEFINITIONS;

const { 1: mockCountryBase } = mockCountries;

describe('helpers/map-cis-countries/map-cis-country/can-apply-offline', () => {
  describe(`when shortTermCoverAvailabilityDesc is ${ILC}`, () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: ILC,
      };

      const result = canApplyForAQuoteOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(true);
    });
  });

  describe(`when shortTermCoverAvailabilityDesc is ${CILC}`, () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: CILC,
      };

      const result = canApplyForAQuoteOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(true);
    });
  });

  describe(`when shortTermCoverAvailabilityDesc is ${REFER}`, () => {
    it('should return true', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: REFER,
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
