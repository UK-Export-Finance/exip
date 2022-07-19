const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  UK_GOODS_OR_SERVICES,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

const mockAnswers = {
  [VALID_COMPANY_BASE]: true,
  [BUYER_COUNTRY]: 'Algeria',
  [CAN_GET_PRIVATE_INSURANCE]: false,
  [UK_GOODS_OR_SERVICES]: 30,
  [CURRENCY]: 'GBP',
  [AMOUNT]: '123456',
  [CREDIT_PERIOD]: 1,
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: 2,
  [PERCENTAGE_OF_COVER]: 90,
};

module.exports = mockAnswers;
