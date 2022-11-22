import { FIELD_IDS, PRODUCT } from '../constants';

export const MAX_COVER_AMOUNT = PRODUCT.MAX_COVER_AMOUNT_IN_GBP.toLocaleString('en', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const ERROR_MESSAGES = {
  [FIELD_IDS.BUYER_COUNTRY]: 'Select where your buyer is based',
  [FIELD_IDS.VALID_BUYER_BODY]: 'Select if your buyer is a government or public sector body',
  [FIELD_IDS.VALID_EXPORTER_LOCATION]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    IS_EMPTY: 'Select if 20% of your export contract value is made up from UK goods/services or not',
  },
  [FIELD_IDS.CURRENCY]: {
    IS_EMPTY: 'Select currency',
  },
  [FIELD_IDS.CONTRACT_VALUE]: {
    IS_EMPTY: 'Enter your contract value as a whole number - do not enter decimals',
    NOT_A_NUMBER: 'Enter your contract value as a whole number - do not enter decimals',
    NOT_A_WHOLE_NUMBER: 'Enter your contract value as a whole number - do not enter decimals',
    BELOW_MINIMUM: 'Contract value must be 1 or more',
  },
  [FIELD_IDS.MAX_AMOUNT_OWED]: {
    IS_EMPTY: 'Enter your maximum amount owed as a whole number - do not enter decimals',
    NOT_A_NUMBER: 'Enter your maximum amount owed as a whole number - do not enter decimals',
    NOT_A_WHOLE_NUMBER: 'Enter your maximum amount owed as a whole number - do not enter decimals',
    BELOW_MINIMUM: 'Maximum amount owed must be 1 or more',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Select credit period',
    BELOW_MINIMUM: 'Credit period must be 1 month or more',
    ABOVE_MAXIMUM: 'Enter Credit period of no more than 2 months',
  },
  [FIELD_IDS.PERCENTAGE_OF_COVER]: {
    IS_EMPTY: 'Select the percentage of cover you need',
  },
  [FIELD_IDS.POLICY_TYPE]: 'Select whether you need a single or multiple contract policy',
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    NOT_A_WHOLE_NUMBER: 'Policy length must be a whole number, like 10 - you cannot enter decimal points',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter how many months you need the policy for',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 22 months',
  },
  [FIELD_IDS.OPTIONAL_COOKIES]: 'Select whether you want to accept analytics cookies',
  INSURANCE: {
    ELIGIBILITY: {
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_AMOUNT]: {
        IS_EMPTY: `Select whether you want to be insured for ${MAX_COVER_AMOUNT} or more`,
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD]: {
        IS_EMPTY: `Select whether you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years`,
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED]: {
        IS_EMPTY: 'Select whether there are any other parties involved, apart from you and the buyer',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT]: {
        IS_EMPTY: "Select whether you'll be paid by a letter of credit or not",
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD]: {
        IS_EMPTY: 'Select whether you need cover for a period before you supply the goods or services to the buyer',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: {
        IS_EMPTY: 'Select whether you have a UK Companies House registration number or not',
      },
    },
  },
};
