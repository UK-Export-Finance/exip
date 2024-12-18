import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { CREDIT_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * hasValidRating
 * Check if a country's "credit rating" is A or B.
 * @param {String} rating: Country rating
 * @returns {Boolean}
 */
export const creditRatingIsAorB = (rating: string): boolean => {
  if (CREDIT_RATINGS.A.includes(rating)) {
    return true;
  }

  if (CREDIT_RATINGS.B.includes(rating)) {
    return true;
  }

  return false;
};

export default creditRatingIsAorB;
