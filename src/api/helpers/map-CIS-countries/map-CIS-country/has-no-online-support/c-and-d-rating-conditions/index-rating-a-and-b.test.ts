import cAndDRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: { COUNTRY_RATINGS, ESRA_CLASSIFICATION, SHORT_TERM_COVER },
} = EXTERNAL_API_DEFINITIONS;

const countryRatingsAParams = COUNTRY_RATINGS.A.map((rating: string) => ({
  countryRating: rating,
  esraClassification: ESRA_CLASSIFICATION.STANDARD,
  shortTermCover: SHORT_TERM_COVER.YES,
}));

const countryRatingsBParams = COUNTRY_RATINGS.B.map((rating: string) => ({
  countryRating: rating,
  esraClassification: ESRA_CLASSIFICATION.STANDARD,
  shortTermCover: SHORT_TERM_COVER.YES,
}));

describe('helpers/map-CIS-countries/map-CIS-country/no-online-support/a-and-b-rating-conditions - rating as A and B', () => {
  describe.each(countryRatingsAParams)('when the country rating is `A`', (countryObj) => {
    it(`should return false for ${countryObj.countryRating}`, () => {
      const result = cAndDRatingConditions(countryObj);

      expect(result).toEqual(false);
    });
  });

  describe.each(countryRatingsBParams)('when the country rating is `B`', (countryObj) => {
    it(`should return false for ${countryObj.countryRating}`, () => {
      const result = cAndDRatingConditions(countryObj);

      expect(result).toEqual(false);
    });
  });
});
