const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');
const { SUMMARY_ANSWERS } = require('../../content-strings');
const formatCurrency = require('../format-currency');
const mapCountry = require('./map-country');
const mapPeriodDays = require('./map-period-days');
const mapPolicyLength = require('./map-policy-length');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  CAN_GET_PRIVATE_INSURANCE_YES,
  CAN_GET_PRIVATE_INSURANCE_NO,
  UK_GOODS_OR_SERVICES,
  AMOUNT,
  CURRENCY,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
} = FIELD_IDS;

const mapPolicyType = (answer) => {
  let mapped;

  if (answer === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    mapped = {
      [SINGLE_POLICY_TYPE]: {
        text: answer,
      },
    };
  }

  if (answer === FIELD_VALUES.POLICY_TYPE.MULTI) {
    mapped = {
      [MULTI_POLICY_TYPE]: {
        text: answer,
      },
    };
  }

  return mapped;
};

const mapTriedPrivateCover = (answer) => {
  let mapped;

  if (answer === FIELD_VALUES.CAN_GET_PRIVATE_INSURANCE.YES) {
    mapped = {
      [CAN_GET_PRIVATE_INSURANCE_YES]: {
        text: SUMMARY_ANSWERS[CAN_GET_PRIVATE_INSURANCE_YES],
      },
    };
  }

  if (answer === FIELD_VALUES.CAN_GET_PRIVATE_INSURANCE.NO) {
    mapped = {
      [CAN_GET_PRIVATE_INSURANCE_NO]: {
        text: SUMMARY_ANSWERS[CAN_GET_PRIVATE_INSURANCE_NO],
      },
    };
  }

  return mapped;
};

const mapAnswersToContent = (answers) => {
  const mapped = {
    [VALID_COMPANY_BASE]: {
      text: SUMMARY_ANSWERS[VALID_COMPANY_BASE],
    },
    [BUYER_COUNTRY]: {
      text: mapCountry(answers[BUYER_COUNTRY]),
    },
    ...mapTriedPrivateCover(answers[CAN_GET_PRIVATE_INSURANCE]),
    [UK_GOODS_OR_SERVICES]: {
      text: SUMMARY_ANSWERS[UK_GOODS_OR_SERVICES],
    },
    [AMOUNT]: {
      text: formatCurrency(answers[AMOUNT], answers[CURRENCY].isoCode),
    },
    ...mapPolicyType(answers[POLICY_TYPE]),
    ...mapPolicyLength(answers),
    [CREDIT_PERIOD]: {
      text: mapPeriodDays(answers[CREDIT_PERIOD]),
    },
  };

  return mapped;
};

module.exports = {
  mapPolicyType,
  mapTriedPrivateCover,
  mapAnswersToContent,
};
