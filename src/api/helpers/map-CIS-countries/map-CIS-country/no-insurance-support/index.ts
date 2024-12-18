import aAndBRatingConditions from './a-and-b-rating-conditions';
import cAndDRatingConditions from './c-and-d-rating-conditions';

// TODO: DRY - this is repeated 3 times.
interface aAndBRatingConditionsParams {
  countryRating: string;
  esraClassification: string;
  shortTermCover: string;
}

/**
 * noInsuranceSupportAvailable
 * Check if a country cannot apply for insurance
 * @param {String} marketRiskAppetitePublicDesc market risk appetite definition from CIS API.
 * @returns {Boolean}
 */
const noInsuranceSupportAvailable = ({ countryRating, esraClassification, shortTermCover }: aAndBRatingConditionsParams): boolean => {
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

export default noInsuranceSupportAvailable;
