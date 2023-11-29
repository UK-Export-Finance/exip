import canApplyForInsuranceOffline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER_AVAILABLE: { NO },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-offline', () => {
  describe(`when originalShortTermCover is ${NO}`, () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOffline(NO);

      expect(result).toEqual(true);
    });
  });

  describe(`when originalShortTermCover is NOT '${NO}'`, () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOffline('anotherValue');

      expect(result).toEqual(false);
    });
  });
});
