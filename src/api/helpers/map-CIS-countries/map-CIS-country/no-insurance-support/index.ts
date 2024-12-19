import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import countryRatingIsCorD from '../country-rating-is-c-or-d';
import esraClassificationIsStandardHighOrVeryHigh from '../esra-classification-is-standard-high-or-very-high';
import { noInsuranceSupportParams } from '../../../../types';

const {
  CIS: {
    COUNTRY_RATINGS: { NOT_APPLICABLE },
    ESRA_CLASSIFICATION: { NONE },
    SHORT_TERM_COVER_AVAILABLE: { UNLISTED, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * noInsuranceSupport
 * Check if a country has no insurance support (online or offline)
 * @param {String} countryRating: Country rating
 * @param {String} esraClassification: ESRA classification
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const noInsuranceSupport = ({ countryRating, esraClassification, shortTermCover }: noInsuranceSupportParams): boolean => {
  const shortTermCoverIsUnlisted = shortTermCover === UNLISTED;
  const esraClassificationIsNone = esraClassification === NONE;
  const countryRatingIsNotApplicable = countryRating === NOT_APPLICABLE;

  if (
    shortTermCoverIsUnlisted &&
    esraClassificationIsNone &&
    (countryRatingIsAorB(countryRating) || countryRatingIsCorD(countryRating) || countryRatingIsNotApplicable)
  ) {
    return true;
  }

  if (shortTermCover === CILC && countryRatingIsNotApplicable && (esraClassificationIsStandardHighOrVeryHigh(esraClassification) || esraClassificationIsNone)) {
    return true;
  }

  return false;
};

export default noInsuranceSupport;
