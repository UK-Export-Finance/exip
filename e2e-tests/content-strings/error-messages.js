const FIELDS = require('./fields');
const FIELD_IDS = require('../constants/field-ids');

const ERROR_MESSAGES = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.VALID_BUYER_BASE]: 'Select if your buyer is based outside the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.TRIED_PRIVATE_COVER]: 'Select if you are unable to get private insurance for this export',
  [FIELD_IDS.COUNTRY]: 'Select the final destination for your export',
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: {
    IS_EMPTY: 'Enter the percentage of your export that is UK content',
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.UK_CONTENT_PERCENTAGE].LABEL} must be a number`,
    BELOW_MINIMUM: `${FIELDS[FIELD_IDS.UK_CONTENT_PERCENTAGE].LABEL} must be 0 or more`,
    ABOVE_MAXIMUM: `${FIELDS[FIELD_IDS.UK_CONTENT_PERCENTAGE].LABEL} must be 100 or fewer`,
  },
  [FIELD_IDS.CREDIT_LIMIT_GROUP]: {
    IS_EMPTY: 'Select the currency and input the credit limit needed',
  },
  [FIELD_IDS.CREDIT_LIMIT]: {
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.CREDIT_LIMIT].TITLE} must be a number`,
  },
  [FIELD_IDS.PRE_CREDIT_PERIOD]: {
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.PRE_CREDIT_PERIOD].TITLE} must be a number`,
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Enter the credit period needed',
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.CREDIT_PERIOD].TITLE} must be a number`,
  },
  [FIELD_IDS.POLICY_LENGTH]: {
    IS_EMPTY: 'Enter the credit policy length needed',
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.POLICY_LENGTH].TITLE} must be a number`,
  },
  [FIELD_IDS.POLICY_TYPE]: 'Select an option for the policy type needed',
};

module.exports = ERROR_MESSAGES;
