import { Company } from './company';
import { Country } from './country';
import { Currency } from './currency';

interface CanCreateApplicationEligibilityFlags {
  hasBuyerCountry?: boolean;
  hasCompanyNumber?: boolean;
  hasCoverPeriod?: boolean;
  hasCompaniesHouseNumber?: boolean;
  hasEndBuyer?: boolean;
  hasMinimumUkGoodsOrServices?: boolean;
  hasReviewedEligibility?: boolean;
  hasTotalContractValue?: boolean;
}

type SharedEligibility = {
  hasMinimumUkGoodsOrServices?: boolean;
  validExporterLocation?: boolean;
};

interface SubmittedDataQuoteEligibility extends SharedEligibility {
  amount?: number;
  buyerCountry?: Country;
  contractValue?: number;
  creditPeriodInMonths?: number;
  currency?: Currency;
  maximumContractAmountOwed?: number;
  percentageOfCover?: number;
  policyType?: string;
  policyLength?: number;
}

interface SectionReview {
  eligibility?: boolean;
}

interface TotalContractValue {
  value?: string;
  valueId?: number;
}

interface InsuranceEligibilityCore extends SharedEligibility {
  companyNumber?: string;
  company?: Company;
  coverPeriod?: number;
  hasCompaniesHouseNumber?: boolean;
  hasEndBuyer?: boolean;
  hasReviewedEligibility?: boolean;
  isPartyToConsortium?: boolean;
  isMemberOfAGroup?: boolean;
  sectionReview?: SectionReview;
  totalContractValue?: TotalContractValue;
}

interface InsuranceEligibility extends InsuranceEligibilityCore {
  buyerCountry: Country;
}

interface SubmittedDataInsuranceEligibility extends InsuranceEligibilityCore {
  buyerCountry?: Country;
}

type SubmittedData = {
  quoteEligibility: SubmittedDataQuoteEligibility;
  insuranceEligibility: SubmittedDataInsuranceEligibility;
};

export {
  CanCreateApplicationEligibilityFlags,
  InsuranceEligibility,
  InsuranceEligibilityCore,
  SubmittedData,
  SubmittedDataInsuranceEligibility,
  SubmittedDataQuoteEligibility,
};
