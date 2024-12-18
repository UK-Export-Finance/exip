import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: { CREDIT_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * hasValidRating
 * Check if a country's "rating" can apply for insurance online.
 * @param {String} rating: Country rating
 * @returns {Boolean}
 */
export const hasValidRating = (rating: string): boolean => {
  if (CREDIT_RATINGS.A.includes(rating)) {
    return true;
  }

  if (CREDIT_RATINGS.B.includes(rating)) {
    return true;
  }

  return false;
};

export default hasValidRating;
