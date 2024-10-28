import canApplyForInsuranceOnline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    RISK: { VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

const mockRiskCategory = VERY_HIGH;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  describe('when shortTermCover=true, riskCategory is provided', () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(true, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=false, riskCategory is null', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(false, null);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(false, '');

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, riskCategory is null', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(true, null);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(true, '');

      expect(result).toEqual(false);
    });
  });
});
