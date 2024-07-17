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
    console.error(`${CORE_LOG_MESSAGE} 'has buyer country' flag`);
  }

  if (!hasCompanyNumber) {
    console.error(`${CORE_LOG_MESSAGE} 'has company number' flag`);
  }

  if (!hasCoverPeriod) {
    console.error(`${CORE_LOG_MESSAGE} 'has cover period' flag`);
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
    console.error(`${CORE_LOG_MESSAGE} 'has minimum UK goods or services' flag`);
  }

  if (!hasReviewedEligibility) {
    console.error(`${CORE_LOG_MESSAGE} 'has reviewed eligibility' flag`);
  }

  if (!hasTotalContractValue) {
    console.error(`${CORE_LOG_MESSAGE} 'has total contract value' flag`);
  }
};

const missingEligibilityFields = {
  log: logMissingEligibilityFields,
};

export default missingEligibilityFields;
