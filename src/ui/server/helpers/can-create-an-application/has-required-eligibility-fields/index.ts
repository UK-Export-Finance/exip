import { CanCreateApplicationEligibilityFlags } from '../../../../types';

/**
 * hasRequiredEligibilityFields
 * Check if all required eligibility answers are provided
 * and have the expected true/false value.
 * @param {CanCreateApplicationEligibilityFlags} eligibilityAnswerFlags: Eligibility answer flags
 * @returns {Boolean}
 */
const hasRequiredEligibilityFields = ({
  hasBuyerCountry,
  hasCompanyNumber,
  hasCoverPeriod,
  hasCompaniesHouseNumber,
  hasEndBuyer,
  hasMinimumUkGoodsOrServices,
  hasReviewedEligibility,
  hasTotalContractValue,
}: CanCreateApplicationEligibilityFlags) => {
  if (
    hasBuyerCountry &&
    hasCompanyNumber &&
    hasCoverPeriod &&
    hasCompaniesHouseNumber &&
    hasEndBuyer === false &&
    hasMinimumUkGoodsOrServices &&
    hasReviewedEligibility &&
    hasTotalContractValue
  ) {
    return true;
  }

  return false;
};

export default hasRequiredEligibilityFields;
