import aAndBRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    CREDIT_RATINGS,
    RISK: { NONE },
    SHORT_TERM_COVER_AVAILABLE: { NO },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/no-insurance-support/a-and-b-rating-conditions - ESRA classification=NONE, short term cover=NO', () => {
  describe('when the country rating is `A`', () => {
    it('should return true', () => {
      const result = aAndBRatingConditions({
        countryRating: CREDIT_RATINGS.A[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });

  describe('when the country rating is `B`', () => {
    it('should return true', () => {
      const result = aAndBRatingConditions({
        countryRating: CREDIT_RATINGS.B[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });
});
