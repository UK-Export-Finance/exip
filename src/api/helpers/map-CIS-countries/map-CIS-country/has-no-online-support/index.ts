import aAndBRatingConditions from './a-and-b-rating-conditions';
import cAndDRatingConditions from './c-and-d-rating-conditions';
import { NoInsuranceSupportParams } from '../../../../types';

/**
 * hasNoOnlineSupport
 * Check if a country has no quote or insurance support (online)
 * @param {string} countryRating: Country rating
 * @param {string} esraClassification: ESRA classification
 * @param {string} shortTermCover: Short term cover
 * @returns {boolean}
 */
const hasNoOnlineSupport = ({ countryRating, esraClassification, shortTermCover }: NoInsuranceSupportParams): boolean => {
  const aAndBConditions = aAndBRatingConditions({
    countryRating,
    esraClassification,
    shortTermCover,
  });

  const cAndDConditions = cAndDRatingConditions({
    countryRating,
    esraClassification,
    shortTermCover,
  });

  const conditions = aAndBConditions || cAndDConditions;

  return conditions;
};

export default hasNoOnlineSupport;
