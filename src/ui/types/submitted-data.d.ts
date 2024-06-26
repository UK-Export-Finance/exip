import { Country } from './country';
import { Currency } from './currency';

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

interface InsuranceEligibilityCore extends SharedEligibility {
  hasCompaniesHouseNumber?: boolean;
  otherPartiesInvolved?: boolean;
  paidByLetterOfCredit?: boolean;
  needPreCreditPeriodCover?: boolean;
  wantCoverOverMaxAmount?: boolean;
  wantCoverOverMaxPeriod?: boolean;
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

export { SubmittedDataQuoteEligibility, InsuranceEligibility, InsuranceEligibilityCore, SubmittedDataInsuranceEligibility, SubmittedData };
