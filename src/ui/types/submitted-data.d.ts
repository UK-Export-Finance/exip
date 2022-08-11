import { Country } from './country';
import { Currency } from './currency';

type SubmittedData = {
  amount?: number;
  buyerCountry?: Country;
  canGetPrivateInsurance?: boolean;
  contractValue?: number;
  creditPeriodInMonths?: number;
  currency?: Currency;
  hasMinimumUkGoodsOrServices?: boolean;
  maximumContractAmountOwed?: number;
  percentageOfCover?: number;
  policyType?: string;
  policyLength?: number;
};

export { SubmittedData };
