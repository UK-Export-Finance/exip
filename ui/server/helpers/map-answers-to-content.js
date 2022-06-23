const { FIELD_VALUES } = require('../constants');
const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY_ANSWERS } = require('../content-strings');
const formatCurrency = require('./format-currency');

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
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const mapCountry = (countryObj) => {
  if (countryObj && countryObj.name) {
    return countryObj.name;
  }

  return '-';
};

const mapCurrency = (currencyObj) => {
  if (currencyObj) {
    return `${currencyObj.name} (${currencyObj.isoCode})`;
  }

  return '-';
};

const mapPeriodDays = (answer) => `${answer} days`;
const mapPeriodMonths = (answer) => `${answer} months`;

const mapPreCreditPeriod = (answer) => {
  if (answer) {
    return mapPeriodDays(answer);
  }

  return '-';
};

const mapPolicyType = (answers) => {
  let mapped;

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    mapped = {
      [SINGLE_POLICY_TYPE]: answers[POLICY_TYPE],
    };
  }

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI) {
    mapped = {
      [MULTI_POLICY_TYPE]: answers[POLICY_TYPE],
    };
  }

  return mapped;
};

const mapPolicyLength = (answers) => {
  let mapped;

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    mapped = {
      [SINGLE_POLICY_LENGTH]: mapPeriodMonths(answers[POLICY_LENGTH]),
    };
  }

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI) {
    mapped = {
      [MULTI_POLICY_LENGTH]: mapPeriodMonths(answers[POLICY_LENGTH]),
    };
  }

  return mapped;
};

const mapAnswersToContent = (answers) => {
  const mapped = {
    [VALID_COMPANY_BASE]: SUMMARY_ANSWERS[VALID_COMPANY_BASE],
    [BUYER_COUNTRY]: mapCountry(answers[BUYER_COUNTRY]),
    [TRIED_PRIVATE_COVER]: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER],
    [UK_CONTENT_PERCENTAGE]: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
    [AMOUNT]: formatCurrency(answers[AMOUNT], 'GBP'),
    [CURRENCY]: mapCurrency(answers[CURRENCY]),
    [PRE_CREDIT_PERIOD]: mapPreCreditPeriod(answers[PRE_CREDIT_PERIOD]),
    [CREDIT_PERIOD]: mapPeriodDays(answers[CREDIT_PERIOD]),
    ...mapPolicyType(answers),
    ...mapPolicyLength(answers),
  };

  return mapped;
};

module.exports = {
  mapCountry,
  mapCurrency,
  mapPeriodDays,
  mapPeriodMonths,
  mapPreCreditPeriod,
  mapPolicyType,
  mapPolicyLength,
  mapAnswersToContent,
};
