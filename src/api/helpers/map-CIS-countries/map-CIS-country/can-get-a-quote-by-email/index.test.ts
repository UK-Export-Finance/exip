import canGetAQuoteByEmail from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-cis-countries/map-cis-country/can-get-a-quote-by-email', () => {
  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is provided', () => {
    it('should return true', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: false, riskCategory: mockRiskCategory });

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: false, riskCategory: null });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: false, riskCategory: '' });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, nbiIssueAvailable=false, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: false, nbiIssueAvailable: false, riskCategory: mockRiskCategory });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: true, riskCategory: mockRiskCategory });

      expect(result).toEqual(false);
    });
  });
});
