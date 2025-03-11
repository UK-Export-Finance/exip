import SHARED from './shared';
import SHARED_ELIGIBILITY_FIELD_IDS from './shared-eligibility';
import FEEDBACK from './feedback';
import INSURANCE from './insurance';

export const FIELD_IDS = {
  OPTIONAL_COOKIES: 'optionalCookies',
  ...SHARED,
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    VALID_TYPE_OF_BUYER: 'validBuyerBody',
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
  FEEDBACK,
  INSURANCE,
} as const;
