import canApplyOnline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-cis-countries/map-cis-country/can-apply-online', () => {
  describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
    it('should return true', () => {
      const result = canApplyOnline(CIS.SHORT_TERM_COVER_AVAILABLE.YES);

      expect(result).toEqual(true);
    });
  });

  describe(`when shortTermCoverAvailabilityDesc is NOT ${CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
    it('should return false', () => {
      const result = canApplyOnline('Something else');

      expect(result).toEqual(false);
    });
  });
});
