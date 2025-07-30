import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { COUNTRY_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * countryRatingIsAorB
 * Check if a country's "country rating" is A or B.
 * @param {string} rating: Country rating
 * @returns {boolean}
 */
const countryRatingIsAorB = (rating: string): boolean => {
  if (COUNTRY_RATINGS.A.includes(rating)) {
    return true;
  }

  if (COUNTRY_RATINGS.B.includes(rating)) {
    return true;
  }

  return false;
};

export default countryRatingIsAorB;
