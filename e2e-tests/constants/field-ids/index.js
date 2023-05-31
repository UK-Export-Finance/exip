import { SHARED } from './shared';
import { SHARED_ELIGIBILITY_FIELD_IDS } from './shared-eligibility';
import { INSURANCE_FIELD_IDS } from './insurance';

export const FIELD_IDS = {
  OPTIONAL_COOKIES: 'optionalCookies',
  ...SHARED,
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    VALID_BUYER_BODY: 'validBuyerBody',
    COUNTRY: 'country',
    AMOUNT_CURRENCY: 'amountAndCurrency',
    CURRENCY: 'currency',
    CONTRACT_VALUE: 'contractValue',
    MAX_AMOUNT_OWED: 'maximumContractAmountOwed',
    CREDIT_PERIOD: 'creditPeriodInMonths',
    PERCENTAGE_OF_COVER: 'percentageOfCover',
  },
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
  },
  INSURANCE: INSURANCE_FIELD_IDS,
};
