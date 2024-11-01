import { isEmptyString } from '../../string';
import { CanCreateApplicationEligibilityFlags, InsuranceEligibility } from '../../../../types';

/**
 * getSubmittedEligibilityFields
 * Get submitted eligibility fields
 * @param {InsuranceEligibility} eligibilityAnswers: Eligibility answers
 * @returns {CanCreateApplicationEligibilityFlags} Eligibility answer boolean flags
 */
const getSubmittedEligibilityFields = (eligibilityAnswers: InsuranceEligibility): CanCreateApplicationEligibilityFlags => {
  const { buyerCountry, company, coverPeriod, hasCompaniesHouseNumber, hasEndBuyer, hasMinimumUkGoodsOrServices, hasReviewedEligibility, totalContractValue } =
    eligibilityAnswers;

  return {
    hasBuyerCountry: !isEmptyString(buyerCountry?.isoCode),
    hasCompanyNumber: !isEmptyString(String(company?.companyNumber)),
    hasCoverPeriod: Boolean(coverPeriod),
    hasCompaniesHouseNumber: Boolean(hasCompaniesHouseNumber),
    hasEndBuyer: Boolean(hasEndBuyer),
    hasMinimumUkGoodsOrServices: Boolean(hasMinimumUkGoodsOrServices),
    hasReviewedEligibility: Boolean(hasReviewedEligibility),
    hasTotalContractValue: Boolean(totalContractValue),
  };
};

export default getSubmittedEligibilityFields;
