import SHARED from './shared';
import SHARED_ELIGIBILITY_FIELD_IDS from './shared-eligibility';
import INSURANCE from './insurance';

export const FIELD_IDS = {
  ...SHARED,
  ...SHARED_ELIGIBILITY_FIELD_IDS,
  OPTIONAL_COOKIES: 'optionalCookies',
  VALID_BUYER_BODY: 'validBuyerBody',
  COUNTRY: 'country',
  AMOUNT_CURRENCY: 'amountAndCurrency',
  CURRENCY: 'currency',
  CONTRACT_VALUE: 'contractValue',
  MAX_AMOUNT_OWED: 'maximumContractAmountOwed',
  CREDIT_PERIOD: 'creditPeriodInMonths',
  ...SHARED,
  POLICY_LENGTH: 'policyLength',
  SINGLE_POLICY_LENGTH: 'singlePolicyLengthMonths',
  MULTIPLE_POLICY_LENGTH: 'multiplePolicyLengthMonths',
  PERCENTAGE_OF_COVER: 'percentageOfCover',
  QUOTE: {
    INSURED_FOR: 'insuredFor',
    PREMIUM_RATE_PERCENTAGE: 'premiumRatePercentage',
    ESTIMATED_COST: 'estimatedCost',
    BUYER_LOCATION: 'buyerCountry',
  },
  FEEDBACK: {
    SATISFACTION: 'satisfaction',
    VERY_SATISFIED: 'verySatisfied',
    SATISFIED: 'satisfied',
    NEITHER: 'neither',
    DISSATISFIED: 'dissatisfied',
    VERY_DISSATISIFED: 'veryDissatisfied',
    IMPROVEMENT: 'improvement',
    OTHER_COMMENTS: 'otherComments',
    TYPE: 'type',
    REFERRAL_URL: 'referralUrl',
  },
  INSURANCE,
};
