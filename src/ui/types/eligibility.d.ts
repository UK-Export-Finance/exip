import { Company } from './company';
import { Country } from './country';
import { Currency } from './currency';

interface SectionReview {
  eligibility?: boolean;
}

interface TotalContractValue {
  value?: string;
  valueId?: number;
}

type SharedEligibility = {
  hasMinimumUkGoodsOrServices?: boolean;
  validExporterLocation?: boolean;
};

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
  buyerCountry?: Country;
}

interface QuoteEligibility extends SharedEligibility {
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

type EligibilityData = {
  quoteEligibility: QuoteEligibility;
  insuranceEligibility: InsuranceEligibility;
};

export { SectionReview, TotalContractValue, InsuranceEligibilityCore, InsuranceEligibility, QuoteEligibility, EligibilityData };
