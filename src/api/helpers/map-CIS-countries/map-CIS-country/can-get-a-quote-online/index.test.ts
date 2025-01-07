import canGetAQuoteOnline from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockEsraClassification = RISK.STANDARD;

describe('helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online', () => {
  describe('when shortTermCover=true, nbiIssueAvailable=true, esraClassification is provided', () => {
    it('should return true', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: true, esraClassification: mockEsraClassification });

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, esraClassification is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: true, esraClassification: null });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, esraClassification is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: true, esraClassification: '' });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, nbiIssueAvailable=true, esraClassification is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: false, nbiIssueAvailable: true, esraClassification: mockEsraClassification });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, esraClassification is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteOnline({ shortTermCover: true, nbiIssueAvailable: false, esraClassification: mockEsraClassification });

      expect(result).toEqual(false);
    });
  });
});
