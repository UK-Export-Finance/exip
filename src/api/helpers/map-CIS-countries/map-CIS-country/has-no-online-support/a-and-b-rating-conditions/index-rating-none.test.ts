import aAndBRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    COUNTRY_RATINGS,
    ESRA_CLASSIFICATION: { NONE },
    SHORT_TERM_COVER: { NO },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/no-online-support/a-and-b-rating-conditions - ESRA classification=NONE, short term cover=NO', () => {
  describe('when the country rating is `A`', () => {
    it('should return true', () => {
      const result = aAndBRatingConditions({
        countryRating: COUNTRY_RATINGS.A[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });

  describe('when the country rating is `B`', () => {
    it('should return true', () => {
      const result = aAndBRatingConditions({
        countryRating: COUNTRY_RATINGS.B[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });
});
