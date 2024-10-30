import cannotGetAQuote from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const mockEsraClassification = RISK.STANDARD;

describe('helpers/map-cis-countries/map-cis-country/cannot-get-a-quote', () => {
  describe('when country has shortTermCover=false, nbiIssueAvailable=false and no esraClassification', () => {
    it('should return true', () => {
      const result = cannotGetAQuote({ shortTermCover: false, nbiIssueAvailable: false, esraClassification: null });

      expect(result).toEqual(true);
    });
  });

  describe('when country has shortTermCover=false, nbiIssueAvailable=false and has a esraClassification', () => {
    it('should return true', () => {
      const result = cannotGetAQuote({ shortTermCover: false, nbiIssueAvailable: false, esraClassification: mockEsraClassification });

      expect(result).toEqual(true);
    });
  });

  describe('when country has shortTermCover=true, nbiIssueAvailable=true and has a esraClassification', () => {
    it('should return false', () => {
      const result = cannotGetAQuote({ shortTermCover: true, nbiIssueAvailable: true, esraClassification: mockEsraClassification });

      expect(result).toEqual(false);
    });
  });
});
