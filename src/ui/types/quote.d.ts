import { Country } from './country';
import { Currency } from './currency';
import { SummaryListField } from './summary-list';

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
  policyType: number;
  premiumRatePercentage: number;
};

interface QuoteContent {
  contractValue?: SummaryListField;
  buyerCountry: SummaryListField;
  estimatedCost: SummaryListField;
  insuredFor: SummaryListField;
  maximumContractAmountOwed?: SummaryListField;
  multiPolicyLengthMonths?: SummaryListField;
  percentageOfCover: SummaryListField;
  premiumRatePercentage: SummaryListField;
  singlePolicyLengthMonths?: SummaryListField;
}

export { Quote, QuoteContent };
