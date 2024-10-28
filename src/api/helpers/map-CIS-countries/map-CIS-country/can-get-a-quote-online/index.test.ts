import canGetAQuoteOnline from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online', () => {
  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is provided', () => {
    it('should return true', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: true, riskCategory: mockRiskCategory });

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: true, riskCategory: null });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: true, riskCategory: '' });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, nbiIssueAvailable=true, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: false, nbiIssueAvailable: true, riskCategory: mockRiskCategory });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: false, riskCategory: mockRiskCategory });

      expect(result).toEqual(false);
    });
  });
});
