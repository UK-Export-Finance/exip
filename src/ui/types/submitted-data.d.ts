import { Country } from './country';
import { Currency } from './currency';

type SharedEligibility = {
  buyerCountry?: Country;
  hasMinimumUkGoodsOrServices?: boolean;
  validExporterLocation?: boolean;
};

interface SubmittedDataQuoteEligibility extends SharedEligibility {
  amount?: number;
  contractValue?: number;
  creditPeriodInMonths?: number;
  currency?: Currency;
  maximumContractAmountOwed?: number;
  percentageOfCover?: number;
  policyType?: string;
  policyLength?: number;
}

interface SubmittedDataInsuranceEligibility extends SharedEligibility {
  haveCompaniesHouseNumber?: boolean;
  otherPartiesInvolved?: boolean;
  paidByLetterOfCredit?: boolean;
  needPreCreditPeriodCover?: boolean;
  wantCoverOverMaxAmount?: boolean;
  wantCoverOverMaxPeriod?: boolean;
}

type SubmittedData = {
  quoteEligibility: SubmittedDataQuoteEligibility;
  insuranceEligibility: SubmittedDataInsuranceEligibility;
};

export { SubmittedDataQuoteEligibility, SubmittedDataInsuranceEligibility, SubmittedData };
