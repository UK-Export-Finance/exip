const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

const mockAnswers = {
  [VALID_COMPANY_BASE]: true,
  [BUYER_COUNTRY]: 'France',
  [TRIED_PRIVATE_COVER]: true,
  [UK_CONTENT_PERCENTAGE]: 30,
  [CURRENCY]: 'GBP',
  [AMOUNT]: 123456,
  [PRE_CREDIT_PERIOD]: 12,
  [CREDIT_PERIOD]: 24,
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: 10,
};

module.exports = mockAnswers;
