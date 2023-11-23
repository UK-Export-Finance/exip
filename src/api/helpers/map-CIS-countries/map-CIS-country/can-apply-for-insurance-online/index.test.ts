import canApplyForInsuranceOnline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(CIS.SHORT_TERM_COVER_AVAILABLE.YES);

      expect(result).toEqual(true);
    });
  });

  describe(`when shortTermCoverAvailabilityDesc is NOT ${CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline('Something else');

      expect(result).toEqual(false);
    });
  });
});
