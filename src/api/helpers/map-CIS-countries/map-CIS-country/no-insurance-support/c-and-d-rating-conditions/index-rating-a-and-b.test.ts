import cAndDRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: { CREDIT_RATINGS, RISK, SHORT_TERM_COVER_AVAILABLE },
} = EXTERNAL_API_DEFINITIONS;

const countryRatingsAParams = CREDIT_RATINGS.A.map((rating: string) => ({
  countryRating: rating,
  esraClassification: RISK.STANDARD,
  shortTermCover: SHORT_TERM_COVER_AVAILABLE.YES,
}));

const countryRatingsBParams = CREDIT_RATINGS.B.map((rating: string) => ({
  countryRating: rating,
  esraClassification: RISK.STANDARD,
  shortTermCover: SHORT_TERM_COVER_AVAILABLE.YES,
}));

describe('helpers/map-CIS-countries/map-CIS-country/no-insurance-support/a-and-b-rating-conditions - rating as A and B', () => {
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
