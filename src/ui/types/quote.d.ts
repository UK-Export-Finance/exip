import { Country } from './country';
import { Currency } from './currency';

type Quote = {
  buyerCountry: Country;
  currency: Currency;
  contractValue?: number;
  creditPeriodInMonths?: number;
  estimatedCost: number;
  insuredFor: number;
  maximumContractAmountOwed?: number;
  percentageOfCover: number;
  policyLength: number;
  policyType: string;
  premiumRatePercentage: number;
};

interface QuoteContent {
  contractValue?: string;
  buyerCountry: string;
  estimatedCost: string;
  insuredFor: string;
  maximumContractAmountOwed?: string;
  multiPolicyLengthMonths?: string;
  percentageOfCover: string;
  premiumRatePercentage: string;
  singlePolicyLengthMonths?: string;
  policyType?: string;
  policyLength?: string;
}

export { Quote, QuoteContent };
