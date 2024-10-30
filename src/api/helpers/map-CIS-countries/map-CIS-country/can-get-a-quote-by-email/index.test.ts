import canGetAQuoteByEmail from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockEsraClassification = RISK.STANDARD;

describe('helpers/map-cis-countries/map-cis-country/can-get-a-quote-by-email', () => {
  describe('when shortTermCover=true, nbiIssueAvailable=false, esraClassification is provided', () => {
    it('should return true', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: false, esraClassification: mockEsraClassification });

      expect(result).toEqual(true);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, esraClassification is null', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: false, esraClassification: null });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=false, esraClassification is an empty string', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: false, esraClassification: '' });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=false, nbiIssueAvailable=false, esraClassification is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: false, nbiIssueAvailable: false, esraClassification: mockEsraClassification });

      expect(result).toEqual(false);
    });
  });

  describe('when shortTermCover=true, nbiIssueAvailable=true, esraClassification is provided', () => {
    it('should return false', () => {
      const result = canGetAQuoteByEmail({ shortTermCover: true, nbiIssueAvailable: true, esraClassification: mockEsraClassification });

      expect(result).toEqual(false);
    });
  });
});
