import cAndDRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    COUNTRY_RATINGS,
    ESRA_CLASSIFICATION: { NONE },
    SHORT_TERM_COVER: { NO },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/no-online-support/c-and-d-rating-conditions - ESRA classification=NONE, short term cover=NO', () => {
  describe('when the country rating is `C`', () => {
    it('should return true', () => {
      const result = cAndDRatingConditions({
        countryRating: COUNTRY_RATINGS.C[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });

  describe('when the country rating is `D`', () => {
    it('should return true', () => {
      const result = cAndDRatingConditions({
        countryRating: COUNTRY_RATINGS.D[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });
});
