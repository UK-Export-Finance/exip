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
 * hasNoSupport
 * Check if a country has no quote or insurance support (online or offline)
 * @param {String} countryRating: Country rating
 * @param {String} esraClassification: ESRA classification
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const hasNoSupport = ({ countryRating, esraClassification, shortTermCover }: NoInsuranceSupportParams): boolean => {
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

export default hasNoSupport;
