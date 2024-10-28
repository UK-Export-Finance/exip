import canGetAQuoteOnline from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online', () => {
  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is provided', () => {
    it('should return true', () => {
      const result = canGetAQuoteOnline(true, true, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(true, true, null);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(true, true, '');

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, nbiIssueAvailable=true, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(false, true, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, riskCategory is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(true, false, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });
});
