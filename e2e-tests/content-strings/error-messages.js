const FIELD_IDS = require('../constants/field-ids');

const ERROR_MESSAGES = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.BUYER_COUNTRY]: 'Select the country your buyer is based in',
  [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: 'Select if you are able to get private insurance for this export',
  [FIELD_IDS.COUNTRY]: 'Select the country your buyer is based in',
  [FIELD_IDS.UK_GOODS_OR_SERVICES]: {
    IS_EMPTY: 'Select whether at least 20% of your export contract value is made up from UK goods and services',
  },
  [FIELD_IDS.CURRENCY]: {
    IS_EMPTY: 'Select currency',
  },
  [FIELD_IDS.AMOUNT]: {
    IS_EMPTY: 'Enter how much you want to be insured for',
    NOT_A_NUMBER: 'Amount must be a number',
    BELOW_MINIMUM: 'Amount must be 1 or more',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Enter the credit period you have with your buyer',
    NOT_A_NUMBER: 'Credit period must be a number',
    NOT_A_WHOLE_NUMBER: 'Credit period must be a whole number, like 10 - you cannot enter decimal points',
    BELOW_MINIMUM: 'Credit period must be 1 day or more',
  },
  [FIELD_IDS.PERCENTAGE_OF_COVER]: {
    IS_EMPTY: 'Select the percentage of cover you need',
  },
  [FIELD_IDS.POLICY_TYPE]: 'Select what kind of policy you need',
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    NOT_A_WHOLE_NUMBER: 'Policy length must be a whole number, like 10 - you cannot enter decimal points',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter how long you need the policy for',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 9 months',
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    NOT_A_WHOLE_NUMBER: 'Policy length must be a whole number, like 10 - you cannot enter decimal points',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter policy length of no more than 9 months',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 9 months',
  },
};

module.exports = ERROR_MESSAGES;
