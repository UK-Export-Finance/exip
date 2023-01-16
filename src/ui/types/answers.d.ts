import { SummaryListItemData } from './summary-list';

interface AnswersContent {
  buyerCountry?: string;
  contractValue?: string;
  creditPeriodInMonths?: string;
  currency?: string;
  hasMinimumUkGoodsOrServices?: string;
  maximumContractAmountOwed?: string;
  singlePolicyLengthMonths?: string;
  singlePolicyType?: string;
  multiPolicyLengthMonths?: string;
  multiPolicyType?: string;
  percentageOfCover?: string;
  policyType?: string;
  policyLength?: string;
  validExporterLocation?: string;
}

interface AnswersFieldGroups {
  EXPORT_DETAILS: Array<SummaryListItemData>;
  POLICY_DETAILS: Array<SummaryListItemData>;
}

export { AnswersContent, AnswersFieldGroups };
