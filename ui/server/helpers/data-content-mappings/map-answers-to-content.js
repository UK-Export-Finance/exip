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
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
} = FIELD_IDS;

const mapCurrency = (currencyObj) => {
  if (currencyObj) {
    return `${currencyObj.name} (${currencyObj.isoCode})`;
  }

  return '-';
};

const mapPolicyType = (answers) => {
  let mapped;

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    mapped = {
      [SINGLE_POLICY_TYPE]: {
        text: answers[POLICY_TYPE],
      },
    };
  }

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI) {
    mapped = {
      [MULTI_POLICY_TYPE]: {
        text: answers[POLICY_TYPE],
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
    [TRIED_PRIVATE_COVER]: {
      text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER],
    },
    [UK_CONTENT_PERCENTAGE]: {
      text: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
    },
    [AMOUNT]: {
      text: formatCurrency(answers[AMOUNT], 'GBP'),
    },
    [CURRENCY]: {
      text: mapCurrency(answers[CURRENCY]),
    },
    [CREDIT_PERIOD]: {
      text: mapPeriodDays(answers[CREDIT_PERIOD]),
    },
    ...mapPolicyType(answers),
    ...mapPolicyLength(answers),
  };

  return mapped;
};

module.exports = {
  mapCurrency,
  mapPolicyType,
  mapAnswersToContent,
};
