import { CanCreateApplicationEligibilityFlags } from '../../../../types';

export const CORE_LOG_MESSAGE = 'Eligibility session data does not have a';

/**
 * logMissingEligibilityFields
 * Log out any specific missing or invalid eligibility answers/flags
 * @param {CanCreateApplicationEligibilityFlags} eligibilityAnswerFlags: Eligibility answer flags
 */
const logMissingEligibilityFields = ({
  hasBuyerCountry,
  hasCompanyNumber,
  hasCoverPeriod,
  hasEndBuyer,
  hasMinimumUkGoodsOrServices,
  hasReviewedEligibility,
  hasTotalContractValue,
}: CanCreateApplicationEligibilityFlags) => {
  console.info('Checking eligibility session has all required data to create an application');

  if (!hasBuyerCountry) {
    console.error("%s 'has buyer country' flag", CORE_LOG_MESSAGE);
  }

  if (!hasCompanyNumber) {
    console.error("%s 'has company number' flag", CORE_LOG_MESSAGE);
  }

  if (!hasCoverPeriod) {
    console.error("%s 'has cover period' flag", CORE_LOG_MESSAGE);
  }

  /**
   * NOTE
   * hasEndBuyer should always have a false value.
   * The form with this question can only be progressed,
   * if the answer is submitted as no (false).
   */
  if (hasEndBuyer !== false) {
    console.error('Eligibility session data has an invalid `has end buyer` flag (should have a false boolean value)');
  }

  if (!hasMinimumUkGoodsOrServices) {
    console.error("%s 'has minimum UK goods or services' flag", CORE_LOG_MESSAGE);
  }

  if (!hasReviewedEligibility) {
    console.error("%s 'has reviewed eligibility' flag", CORE_LOG_MESSAGE);
  }

  if (!hasTotalContractValue) {
    console.error("%s 'has total contract value' flag", CORE_LOG_MESSAGE);
  }
};

const missingEligibilityFields = {
  log: logMissingEligibilityFields,
};

export default missingEligibilityFields;
