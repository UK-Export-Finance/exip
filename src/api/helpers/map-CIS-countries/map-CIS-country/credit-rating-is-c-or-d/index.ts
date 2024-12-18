import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { CREDIT_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * creditRatingIsCorD
 * Check if a country's "credit rating" is C or D.
 * @param {String} rating: Country rating
 * @returns {Boolean}
 */
const creditRatingIsCorD = (rating: string): boolean => {
  if (CREDIT_RATINGS.C.includes(rating)) {
    return true;
  }

  if (CREDIT_RATINGS.D.includes(rating)) {
    return true;
  }

  return false;
};

export default creditRatingIsCorD;
