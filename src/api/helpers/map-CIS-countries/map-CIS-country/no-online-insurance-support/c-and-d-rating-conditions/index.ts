import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';
import creditRatingIsCorD from '../../credit-rating-is-c-or-d';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH, NONE },
    SHORT_TERM_COVER_AVAILABLE: { YES, NO, ILC, CILC, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

interface aAndDRatingConditionsParams {
  countryRating: string;
  esraClassification: string;
  shortTermCover: string;
}

/**
 * aAndDRatingConditions
 * Country conditions for "C and D country ratings",
 * to determine if a country does NOT have insurance support available.
 * @param {String} countryRating: Country rating
 * @param {String} esraClassification: ESRA classification
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const aAndDRatingConditions = ({ countryRating, esraClassification, shortTermCover }: aAndDRatingConditionsParams): boolean => {
  if (!creditRatingIsCorD(countryRating)) {
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
