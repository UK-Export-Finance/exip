import { Country } from './country';
import { Currency } from './currency';
import { SummaryListField } from './summary-list';

type Quote = {
  buyerCountry: Country;
  currency: Currency;
  creditPeriodInMonths?: number;
  estimatedCost: number;
  insuredFor: number;
  percentageOfCover: number;
  policyLength: number;
  policyType: number;
  premiumRatePercentage: number;
};

interface QuoteContent {
  buyerCountry: SummaryListField;
  estimatedCost: SummaryListField;
  insuredFor: SummaryListField;
  multiPolicyLengthMonths?: SummaryListField;
  percentageOfCover: SummaryListField;
  premiumRatePercentage: SummaryListField;
  singlePolicyLengthMonths?: SummaryListField;
}

export { Quote, QuoteContent };
