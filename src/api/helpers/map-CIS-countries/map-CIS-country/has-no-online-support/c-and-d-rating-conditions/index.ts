import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';
import countryRatingIsCorD from '../../country-rating-is-c-or-d';
import { NoInsuranceSupportParams } from '../../../../../types';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH, NONE },
    SHORT_TERM_COVER: { YES, NO, ILC, CILC, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * cAndDRatingConditions
 * Country conditions for "C and D country ratings",
 * to determine if a country does NOT have insurance support available.
 * @param {string} countryRating: Country rating
 * @param {string} esraClassification: ESRA classification
 * @param {string} shortTermCover: Short term cover
 * @returns {boolean}
 */
const cAndDRatingConditions = ({ countryRating, esraClassification, shortTermCover }: NoInsuranceSupportParams): boolean => {
  if (!countryRatingIsCorD(countryRating)) {
    return false;
  }

  if (esraClassification === STANDARD || esraClassification === HIGH || esraClassification === VERY_HIGH) {
    if (shortTermCover === YES) {
      return true;
    }

    if (shortTermCover === ILC) {
      return true;
    }

    if (shortTermCover === CILC) {
      return true;
    }

    if (shortTermCover === REFER) {
      return true;
    }

    if (shortTermCover === UNLISTED) {
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

export default cAndDRatingConditions;
