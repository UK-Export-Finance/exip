import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';
import countryRatingIsCorD from '../../country-rating-is-c-or-d';
import { noOnlineInsuranceSupportParams } from '../../../../../types';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH, NONE },
    SHORT_TERM_COVER_AVAILABLE: { YES, NO, ILC, CILC, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * aAndDRatingConditions
 * Country conditions for "C and D country ratings",
 * to determine if a country does NOT have insurance support available.
 * @param {String} countryRating: Country rating
 * @param {String} esraClassification: ESRA classification
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const aAndDRatingConditions = ({ countryRating, esraClassification, shortTermCover }: noOnlineInsuranceSupportParams): boolean => {
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

export default aAndDRatingConditions;
