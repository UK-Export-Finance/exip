import aAndBRatingConditions from './a-and-b-rating-conditions';
import cAndDRatingConditions from './c-and-d-rating-conditions';
import { noOnlineInsuranceSupportParams } from '../../../../types';

/**
 * noOnlineInsuranceSupport
 * Check if a country cannot apply for insurance
 * @param {String} marketRiskAppetitePublicDesc market risk appetite definition from CIS API.
 * @returns {Boolean}
 */
const noOnlineInsuranceSupport = ({ countryRating, esraClassification, shortTermCover }: noOnlineInsuranceSupportParams): boolean => {
  const conditions =
    aAndBRatingConditions({
      countryRating,
      esraClassification,
      shortTermCover,
    }) ||
    cAndDRatingConditions({
      countryRating,
      esraClassification,
      shortTermCover,
    });
  return conditions;
};

export default noOnlineInsuranceSupport;
