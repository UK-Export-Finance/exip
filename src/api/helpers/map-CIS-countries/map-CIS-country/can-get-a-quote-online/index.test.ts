import canGetAQuoteOnline from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockShortTermCover = true;
const mockNbiIssueAvailable = true;
const mockRiskCategory = RISK.STANDARD;

describe('helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online', () => {
  describe('when a country has shortTermCover=true, nbiIssueAvailable=true and has a riskCategory', () => {
    it('should return true', () => {
      const result = canGetAQuoteOnline(mockShortTermCover, mockNbiIssueAvailable, mockRiskCategory);

      expect(result).toEqual(true);
    });
  });

  describe('when riskCategory is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(mockShortTermCover, mockNbiIssueAvailable, null);

      expect(result).toEqual(false);
    });
  });

  describe('when riskCategory is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(mockShortTermCover, mockNbiIssueAvailable, '');

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(false, mockNbiIssueAvailable, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });

  describe('when nbiIssueAvailable=false', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline(mockShortTermCover, false, mockRiskCategory);

      expect(result).toEqual(false);
    });
  });
});
