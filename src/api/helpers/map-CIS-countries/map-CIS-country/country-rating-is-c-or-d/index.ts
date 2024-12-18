import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { COUNTRY_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * countryRatingIsCorD
 * Check if a country's "country rating" is C or D.
 * @param {String} rating: Country rating
 * @returns {Boolean}
 */
const countryRatingIsCorD = (rating: string): boolean => {
  if (COUNTRY_RATINGS.C.includes(rating)) {
    return true;
  }

  if (COUNTRY_RATINGS.D.includes(rating)) {
    return true;
  }

  return false;
};

export default countryRatingIsCorD;
