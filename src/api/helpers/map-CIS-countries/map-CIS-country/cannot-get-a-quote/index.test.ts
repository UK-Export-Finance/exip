import cannotGetAQuote from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-cis-countries/map-cis-country/cannot-get-a-quote', () => {
  describe('when country has shortTermCover=false, nbiIssueAvailable=false and no riskCategory', () => {
    it('should return true', () => {
      const result = cannotGetAQuote(false, false, null);

      expect(result).toEqual(true);
    });
  });

  describe('when country has shortTermCover=false, nbiIssueAvailable=false and has a riskCategory', () => {
    it('should return true', () => {
      const result = cannotGetAQuote(false, false, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when country has shortTermCover=true, nbiIssueAvailable=true and has a riskCategory', () => {
    it('should return false', () => {
      const result = cannotGetAQuote(true, true, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });
});
