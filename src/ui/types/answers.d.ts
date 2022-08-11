import { SummaryListField, SummaryListItemData } from './summary-list';

interface AnswersContent {
  buyerCountry?: SummaryListField;
  canGetPrivateInsurance?: SummaryListField;
  contractValue?: SummaryListField;
  creditPeriodInMonths?: SummaryListField;
  currency?: SummaryListField;
  hasMinimumUkGoodsOrServices?: SummaryListField;
  maximumContractAmountOwed?: SummaryListField;
  singlePolicyLengthMonths?: SummaryListField;
  singlePolicyType?: SummaryListField;
  multiPolicyLengthMonths?: SummaryListField;
  multiPolicyType?: SummaryListField;
  percentageOfCover?: SummaryListField;
  policyType?: SummaryListField;
  policyLength?: SummaryListField;
  validCompanyBase?: SummaryListField;
}

interface AnswersFieldGroups {
  EXPORT_DETAILS: Array<SummaryListItemData>;
  POLICY_DETAILS: Array<SummaryListItemData>;
}

export { AnswersContent, AnswersFieldGroups };
