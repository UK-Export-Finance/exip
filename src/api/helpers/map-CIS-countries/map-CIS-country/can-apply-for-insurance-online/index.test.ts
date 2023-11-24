import canApplyForInsuranceOnline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER_AVAILABLE: { YES, ILC, CILC, REFER },
    RISK: { VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

const mockRiskCategory = VERY_HIGH;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  describe(`when a country has a riskCategory and originalShortTermCover is '${YES}'`, () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(YES, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe(`when a country has a riskCategory and originalShortTermCover is '${ILC}'`, () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(ILC, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe(`when a country has a riskCategory and originalShortTermCover is '${CILC}'`, () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(CILC, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe(`when a country has a riskCategory and originalShortTermCover is '${REFER}'`, () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(REFER, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when a country has a riskCategory and originalShortTermCover is `TBC-UNLISTED`', () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline('TBC-UNLISTED', mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when a country has a riskCategory and originalShortTermCover is anything else', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline('Something else', mockRiskCategory);

      expect(result).toEqual(false);
    });
  });

  describe('when a country does NOT have a riskCategory, but has a valid originalShortTermCover', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(YES);

      expect(result).toEqual(false);
    });
  });
});
