const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');
const { SUMMARY_ANSWERS } = require('../../content-strings');
const mapCountry = require('./map-country');
const mapCost = require('./map-cost');
const mapPeriodMonths = require('./map-period-months');
const mapPolicyLength = require('./map-policy-length');

const {
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  CAN_GET_PRIVATE_INSURANCE_YES,
  CAN_GET_PRIVATE_INSURANCE_NO,
  CREDIT_PERIOD,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

const mapCanGetPrivateInsurance = (answer) => {
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
    ...mapCanGetPrivateInsurance(answers[CAN_GET_PRIVATE_INSURANCE]),
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
      text: SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
    },
    ...mapCost(answers),
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
  mapCanGetPrivateInsurance,
  mapPolicyType,
  mapPercentageOfCover,
  mapAnswersToContent,
};
