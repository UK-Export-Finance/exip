import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { COUNTRY_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * creditRatingIsAorB
 * Check if a country's "credit rating" is A or B.
 * @param {String} rating: Country rating
 * @returns {Boolean}
 */
const creditRatingIsAorB = (rating: string): boolean => {
  if (COUNTRY_RATINGS.A.includes(rating)) {
    return true;
  }

  if (COUNTRY_RATINGS.B.includes(rating)) {
    return true;
  }

  return false;
};

export default creditRatingIsAorB;
