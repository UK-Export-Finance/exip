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
  TRIED_PRIVATE_COVER,
  TRIED_PRIVATE_COVER_YES,
  TRIED_PRIVATE_COVER_NO,
  UK_CONTENT_PERCENTAGE,
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

  if (answer === FIELD_VALUES.TRIED_PRIVATE_COVER.YES) {
    mapped = {
      [TRIED_PRIVATE_COVER_YES]: {
        text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER_YES],
      },
    };
  }

  if (answer === FIELD_VALUES.TRIED_PRIVATE_COVER.NO) {
    mapped = {
      [TRIED_PRIVATE_COVER_NO]: {
        text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER_NO],
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
    ...mapTriedPrivateCover(answers[TRIED_PRIVATE_COVER]),
    [UK_CONTENT_PERCENTAGE]: {
      text: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
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
