import aAndBRatingConditions from './a-and-b-rating-conditions';
import cAndDRatingConditions from './c-and-d-rating-conditions';
import { NoInsuranceSupportParams } from '../../../../types';

/**
 * noOnlineSupport
 * Check if a country has no quote or insurance support (online)
 * @param {String} countryRating: Country rating
 * @param {String} esraClassification: ESRA classification
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const noOnlineSupport = ({ countryRating, esraClassification, shortTermCover }: NoInsuranceSupportParams): boolean => {
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

export default noOnlineSupport;
