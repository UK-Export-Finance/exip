const FIELD_IDS = require('../constants/field-ids');

const ERROR_MESSAGES = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.BUYER_COUNTRY]: 'Select the country your buyer is based in',
  [FIELD_IDS.TRIED_PRIVATE_COVER]: 'Select if you are unable to get private insurance for this export',
  [FIELD_IDS.COUNTRY]: 'Select the country your buyer is based in',
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: {
    IS_EMPTY: 'Select whether at least 20% of your export is made up of UK goods and services',
  },
  [FIELD_IDS.CURRENCY]: {
    IS_EMPTY: 'Select the currency your buyer will pay you in',
  },
  [FIELD_IDS.AMOUNT]: {
    IS_EMPTY: 'Enter maximum amount your buyer will owe you at any single point',
    NOT_A_NUMBER: 'Maximum amount must be a number',
    BELOW_MINIMUM: 'Maximum amount must be 1 or more',
  },
  [FIELD_IDS.PRE_CREDIT_PERIOD]: {
    NOT_A_NUMBER: 'Pre-credit period must be a number',
    BELOW_MINIMUM: 'Pre-Credit period must be 0 months or more',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Enter how many days credit you extent do your buyer',
    NOT_A_NUMBER: 'Credit period must be a number',
    BELOW_MINIMUM: 'Credit period must be 1 month or more',
  },
  [FIELD_IDS.POLICY_TYPE]: 'Select a policy type',
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter policy length of no more than 24 months',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 24 months',
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter policy length of no more than 12 months',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 12 months',
  },
};

module.exports = ERROR_MESSAGES;
