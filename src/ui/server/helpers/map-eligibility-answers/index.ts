import { FIELD_IDS } from '../../constants';
import { SubmittedDataInsuranceEligibility } from '../../../types';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

/**
 * mapEligibilityAnswers
 * maps answers for eligibility into the correct format to send to the API
 * Adds sectionReview object with eligibility
 * @param {SubmittedDataInsuranceEligibility} answers - eligibility answers
 * @returns {Object} answers object
 */
const mapEligibilityAnswers = (answers: SubmittedDataInsuranceEligibility) => {
  if (answers.buyerCountry) {
    const { buyerCountry, totalContractValue, coverPeriod, hasReviewedEligibility, ...otherAnswers } = answers;

    const mapped = {
      ...otherAnswers,
      [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
      [COVER_PERIOD_ID]: coverPeriod,
      [TOTAL_CONTRACT_VALUE_ID]: totalContractValue,
      sectionReview: {
        eligibility: hasReviewedEligibility,
      },
    };

    return mapped;
  }

  return answers;
};

export default mapEligibilityAnswers;
