import canGetAQuoteByEmail from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-cis-countries/map-cis-country/can-get-a-quote-by-email', () => {
  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is provided', () => {
    it('should return true', () => {
      const result = canGetAQuoteByEmail(true, false, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(true, false, null);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(true, false, '');

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, nbiIssueAvailable=false, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(false, false, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(true, true, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });
});
