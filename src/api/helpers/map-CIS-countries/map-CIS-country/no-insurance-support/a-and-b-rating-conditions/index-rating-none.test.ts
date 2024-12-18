import aAndBRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    CREDIT_RATINGS,
    RISK: { NONE },
    SHORT_TERM_COVER_AVAILABLE: { NO },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/no-insurance-support/a-and-b-rating-conditions - rating as None', () => {
  describe(`when the ESRA classification is ${NONE} and short term cover is ${NO} `, () => {
    it('should return true', () => {
      const result = aAndBRatingConditions({
        countryRating: CREDIT_RATINGS.A[0],
        esraClassification: NONE,
        shortTermCover: NO,
      });

      expect(result).toEqual(true);
    });
  });
});
