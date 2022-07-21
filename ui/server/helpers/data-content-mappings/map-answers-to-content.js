const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');
const { SUMMARY_ANSWERS } = require('../../content-strings');
const formatCurrency = require('../format-currency');
const mapCountry = require('./map-country');
const mapPeriodMonths = require('./map-period-months');
const mapPolicyLength = require('./map-policy-length');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  CAN_GET_PRIVATE_INSURANCE_YES,
  CAN_GET_PRIVATE_INSURANCE_NO,
  CURRENCY,
  CREDIT_PERIOD,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

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

const mapPercentageOfCover = (answer) => `${answer}%`;

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
    [PERCENTAGE_OF_COVER]: {
      text: mapPercentageOfCover(answers[PERCENTAGE_OF_COVER]),
    },
    [CREDIT_PERIOD]: {
      text: mapPeriodMonths(answers[CREDIT_PERIOD]),
    },
  };

  return mapped;
};

module.exports = {
  mapTriedPrivateCover,
  mapPolicyType,
  mapPercentageOfCover,
  mapAnswersToContent,
};
