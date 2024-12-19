import cannotGetAQuote from '.';
import { EXTERNAL_API_MAPPINGS } from '../../../../constants';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD },
  },
} = EXTERNAL_API_MAPPINGS;

describe('helpers/map-cis-countries/map-cis-country/cannot-get-a-quote', () => {
  describe('when country has shortTermCover=false, nbiIssueAvailable=false and no esraClassification', () => {
    it('should return true', () => {
      const result = cannotGetAQuote({ shortTermCover: false, nbiIssueAvailable: false, esraClassification: null });

      expect(result).toEqual(true);
    });
  });

  describe('when country has shortTermCover=false, nbiIssueAvailable=false and has a esraClassification', () => {
    it('should return true', () => {
      const result = cannotGetAQuote({ shortTermCover: false, nbiIssueAvailable: false, esraClassification: STANDARD });

      expect(result).toEqual(true);
    });
  });

  describe('when country has shortTermCover=true, nbiIssueAvailable=true and has a esraClassification', () => {
    it('should return false', () => {
      const result = cannotGetAQuote({ shortTermCover: true, nbiIssueAvailable: true, esraClassification: STANDARD });

      expect(result).toEqual(false);
    });
  });
});
