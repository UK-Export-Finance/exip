import aAndBRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: { COUNTRY_RATINGS, ESRA_CLASSIFICATION, SHORT_TERM_COVER },
} = EXTERNAL_API_DEFINITIONS;

const countryRatingsCParams = COUNTRY_RATINGS.C.map((rating: string) => ({
  countryRating: rating,
  esraClassification: ESRA_CLASSIFICATION.STANDARD,
  shortTermCover: SHORT_TERM_COVER.YES,
}));

const countryRatingsDParams = COUNTRY_RATINGS.D.map((rating: string) => ({
  countryRating: rating,
  esraClassification: ESRA_CLASSIFICATION.STANDARD,
  shortTermCover: SHORT_TERM_COVER.YES,
}));

describe('helpers/map-CIS-countries/map-CIS-country/no-online-insurance-support/a-and-b-rating-conditions - ratings as C and D', () => {
  describe.each(countryRatingsCParams)('when the country rating is `C`', (countryObj) => {
    it(`should return false for ${countryObj.countryRating}`, () => {
      const result = aAndBRatingConditions(countryObj);

      expect(result).toEqual(false);
    });
  });

  describe.each(countryRatingsDParams)('when the country rating is `D`', (countryObj) => {
    it(`should return false for ${countryObj.countryRating}`, () => {
      const result = aAndBRatingConditions(countryObj);

      expect(result).toEqual(false);
    });
  });
});
