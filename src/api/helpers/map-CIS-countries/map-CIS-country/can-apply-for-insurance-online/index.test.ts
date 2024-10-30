import canApplyForInsuranceOnline from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    RISK: { VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

const mockEsraClassification = VERY_HIGH;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online', () => {
  describe('when shortTermCover=true, esraClassification is provided', () => {
    it('should return true', () => {
      const result = canApplyForInsuranceOnline(true, mockEsraClassification);

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=false, esraClassification is null', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(false, null);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, esraClassification is an empty string', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(false, '');

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, esraClassification is null', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(true, null);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, esraClassification is an empty string', () => {
    it('should return false', () => {
      const result = canApplyForInsuranceOnline(true, '');

      expect(result).toEqual(false);
    });
  });
});
