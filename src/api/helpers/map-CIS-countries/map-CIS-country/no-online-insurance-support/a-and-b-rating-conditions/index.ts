import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';
import countryRatingIsAorB from '../../country-rating-is-a-or-b';
import { noInsuranceSupportParams } from '../../../../../types';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH, NONE },
    SHORT_TERM_COVER_AVAILABLE: { NO, ILC, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * aAndBRatingConditions
 * Country conditions for "A and B country ratings",
 * to determine if a country does NOT have insurance support available.
 * @param {String} countryRating: Country rating
 * @param {String} esraClassification: ESRA classification
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const aAndBRatingConditions = ({ countryRating, esraClassification, shortTermCover }: noInsuranceSupportParams): boolean => {
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
