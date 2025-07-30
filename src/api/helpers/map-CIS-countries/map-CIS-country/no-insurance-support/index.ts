import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import countryRatingIsAorB from '../country-rating-is-a-or-b';
import countryRatingIsCorD from '../country-rating-is-c-or-d';
import esraClassificationIsStandardHighOrVeryHigh from '../esra-classification-is-standard-high-or-very-high';
import { NoInsuranceSupportParams } from '../../../../types';

const {
  CIS: {
    COUNTRY_RATINGS: { NOT_APPLICABLE },
    ESRA_CLASSIFICATION: { NONE },
    SHORT_TERM_COVER: { UNLISTED, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * noInsuranceSupport
 * Check if a country has no insurance support (online or offline)
 * @param {string} countryRating: Country rating
 * @param {string} esraClassification: ESRA classification
 * @param {string} shortTermCover: Short term cover
 * @returns {boolean}
 */
const noInsuranceSupport = ({ countryRating, esraClassification, shortTermCover }: NoInsuranceSupportParams): boolean => {
  const shortTermCoverIsUnlisted = shortTermCover === UNLISTED;
  const esraClassificationIsNone = esraClassification === NONE;
  const countryRatingIsNotApplicable = countryRating === NOT_APPLICABLE;

  const countryRatingConditions = countryRatingIsAorB(countryRating) || countryRatingIsCorD(countryRating) || countryRatingIsNotApplicable;

  if (shortTermCoverIsUnlisted && esraClassificationIsNone && countryRatingConditions) {
    return true;
  }

  const esraClassificationConditions = esraClassificationIsStandardHighOrVeryHigh(esraClassification) || esraClassificationIsNone;

  if (shortTermCover === CILC && countryRatingIsNotApplicable && esraClassificationConditions) {
    return true;
  }

  return false;
};

export default noInsuranceSupport;
