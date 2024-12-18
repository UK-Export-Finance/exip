import creditRatingIsAorB from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { CREDIT_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/credit-rating-is-a-or-b', () => {
  describe.each(CREDIT_RATINGS.A)('CREDIT_RATINGS.A', (rating) => {
    it(`should return true for ${rating}`, () => {
      const result = creditRatingIsAorB(rating);

      expect(result).toEqual(true);
    });
  });

  describe.each(CREDIT_RATINGS.B)('CREDIT_RATINGS.B', (rating) => {
    it(`should return true for ${rating}`, () => {
      const result = creditRatingIsAorB(rating);

      expect(result).toEqual(true);
    });
  });

  describe.each(CREDIT_RATINGS.C)('CREDIT_RATINGS.C', (rating) => {
    it(`should return false for ${rating}`, () => {
      const result = creditRatingIsAorB(rating);

      expect(result).toEqual(false);
    });
  });

  describe.each(CREDIT_RATINGS.D)('CREDIT_RATINGS.D', (rating) => {
    it(`should return false for ${rating}`, () => {
      const result = creditRatingIsAorB(rating);

      expect(result).toEqual(false);
    });
  });
});
