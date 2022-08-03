const FIELD_IDS = require('../constants/field-ids');

const ERROR_MESSAGES = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.BUYER_COUNTRY]: 'Select where your buyer is based',
  [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: 'Select if you are able to get private insurance for this export',
  [FIELD_IDS.COUNTRY]: 'Select where your buyer is based',
  [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    IS_EMPTY: 'Select whether at least 20% of your export contract value is made up from UK goods and services',
  },
  [FIELD_IDS.CURRENCY]: {
    IS_EMPTY: 'Select currency',
  },
  [FIELD_IDS.CONTRACT_VALUE]: {
    IS_EMPTY: 'Enter your contract value as a whole number, do not enter decimals',
    NOT_A_NUMBER: 'Enter your contract value as a whole number, do not enter decimals',
    NOT_A_WHOLE_NUMBER: 'Enter your contract value as a whole number, do not enter decimals',
    BELOW_MINIMUM: 'Contract value must be 1 or more',
  },
  [FIELD_IDS.MAX_AMOUNT_OWED]: {
    IS_EMPTY: 'Enter your maximum amount owed as a whole number, do not enter decimals',
    NOT_A_NUMBER: 'Enter your maximum amount owed as a whole number, do not enter decimals',
    NOT_A_WHOLE_NUMBER: 'Enter your maximum amount owed as a whole number, do not enter decimals',
    BELOW_MINIMUM: 'Maximum amount owed must be 1 or more',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Enter the credit period you have with your buyer',
    NOT_A_NUMBER: 'Credit period must be a number',
    NOT_A_WHOLE_NUMBER: 'Credit period must be a whole number, like 2 - you cannot enter decimal points',
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
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    NOT_A_WHOLE_NUMBER: 'Policy length must be a whole number, like 10 - you cannot enter decimal points',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter how many months you need the policy for',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 12 months',
  },
};

module.exports = ERROR_MESSAGES;
