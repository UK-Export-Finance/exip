import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';
import countryRatingIsAorB from '../../country-rating-is-a-or-b';
import { NoInsuranceSupportParams } from '../../../../../types';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH, NONE },
    SHORT_TERM_COVER: { NO, ILC, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * aAndBRatingConditions
 * Country conditions for "A and B country ratings",
 * to determine if a country does NOT have insurance support available.
 * @param {string} countryRating: Country rating
 * @param {string} esraClassification: ESRA classification
 * @param {string} shortTermCover: Short term cover
 * @returns {boolean}
 */
const aAndBRatingConditions = ({ countryRating, esraClassification, shortTermCover }: NoInsuranceSupportParams): boolean => {
  if (!countryRatingIsAorB(countryRating)) {
    return false;
  }

  if (esraClassification === STANDARD || esraClassification === HIGH || esraClassification === VERY_HIGH) {
    if (shortTermCover === ILC) {
      return true;
    }

    if (shortTermCover === CILC) {
      return true;
    }

    if (shortTermCover === NO) {
      return true;
    }
  }

  if (esraClassification === NONE && shortTermCover === NO) {
    return true;
  }

  return false;
};

export default aAndBRatingConditions;
