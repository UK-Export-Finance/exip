import canGetAQuoteByEmail from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockShortTermCover = true;
const mockNbiIssueAvailable = false;
const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-cis-countries/map-cis-country/can-get-a-quote-by-email', () => {
  describe('when a country has shortTermCover=true, nbiIssueAvailable=false and has a riskCategory', () => {
    it('should return true', () => {
      const result = canGetAQuoteByEmail(mockShortTermCover, mockNbiIssueAvailable, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when riskCategory is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(mockShortTermCover, mockNbiIssueAvailable, null);

      expect(result).toEqual(false);
    });
  });

  describe('when riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(mockShortTermCover, mockNbiIssueAvailable, '');

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(false, mockNbiIssueAvailable, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });

  describe('when nbiIssueAvailable=true', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail(mockShortTermCover, true, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });
});
