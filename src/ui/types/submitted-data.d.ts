import { Country } from './country';
import { Currency } from './currency';

type SubmittedDataQuoteEligibility = {
  amount?: number;
  buyerCountry?: Country;
  contractValue?: number;
  creditPeriodInMonths?: number;
  currency?: Currency;
  hasMinimumUkGoodsOrServices?: boolean;
  maximumContractAmountOwed?: number;
  percentageOfCover?: number;
  policyType?: string;
  policyLength?: number;
};

type SubmittedDataInsuranceEligibility = {
  
};

type SubmittedData = {
  quoteEligibility: SubmittedDataQuoteEligibility;
  insuranceEligibility: SubmittedDataInsuranceEligibility;
};

export { SubmittedDataQuoteEligibility, SubmittedDataInsuranceEligibility, SubmittedData };
