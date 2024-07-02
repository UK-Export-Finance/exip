import canApplyForInsuranceOnline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    RISK: { VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

const mockRiskCategory = VERY_HIGH;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  describe('when a country has a riskCategory and shortTermCover of true', () => {
    it('should return true', () => {
      const shortTermCover = true;

      const result = canApplyForInsuranceOnline(shortTermCover, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when a country has a riskCategory and shortTermCover is false', () => {
    it('should return false', () => {
      const shortTermCover = false;

      const result = canApplyForInsuranceOnline(shortTermCover, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });

  describe('when a country does not have a riskCategory and shortTermCover of true', () => {
    it('should return false', () => {
      const shortTermCover = true;

      const result = canApplyForInsuranceOnline(shortTermCover);

      expect(result).toEqual(false);
    });
  });

  describe('when a country does not have a riskCategory and shortTermCover is false', () => {
    it('should return false', () => {
      const shortTermCover = false;

      const result = canApplyForInsuranceOnline(shortTermCover);

      expect(result).toEqual(false);
    });
  });
});
