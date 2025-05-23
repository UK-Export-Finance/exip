import countryRatingIsAorB from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { COUNTRY_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/country-rating-is-a-or-b', () => {
  describe.each(COUNTRY_RATINGS.A)('COUNTRY_RATINGS.A', (rating) => {
    it(`should return true for ${rating}`, () => {
      const result = countryRatingIsAorB(rating);

      expect(result).toEqual(true);
    });
  });

  describe.each(COUNTRY_RATINGS.B)('COUNTRY_RATINGS.B', (rating) => {
    it(`should return true for ${rating}`, () => {
      const result = countryRatingIsAorB(rating);

      expect(result).toEqual(true);
    });
  });

  describe.each(COUNTRY_RATINGS.C)('COUNTRY_RATINGS.C', (rating) => {
    it(`should return false for ${rating}`, () => {
      const result = countryRatingIsAorB(rating);

      expect(result).toEqual(false);
    });
  });

  describe.each(COUNTRY_RATINGS.D)('COUNTRY_RATINGS.D', (rating) => {
    it(`should return false for ${rating}`, () => {
      const result = countryRatingIsAorB(rating);

      expect(result).toEqual(false);
    });
  });
});
