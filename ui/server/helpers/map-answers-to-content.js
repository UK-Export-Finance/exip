const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY_ANSWERS } = require('../content-strings');
const formatCurrency = require('./format-currency');

const mapPeriodDays = (answer) => `${answer} days`;
const mapPeriodMonths = (answer) => `${answer} months`;

const mapCurrency = (currencyObj) =>
  `${currencyObj.name} (${currencyObj.isoCode})`;

const mapPreCreditPeriod = (answer) => {
  if (answer) {
    return mapPeriodDays(answer);
  }

  return '-';
};

const mapAnswersToContent = (answers) => {
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

  const mapped = {
    [VALID_COMPANY_BASE]: SUMMARY_ANSWERS[VALID_COMPANY_BASE],
    [BUYER_COUNTRY]: answers[BUYER_COUNTRY].name,
    [TRIED_PRIVATE_COVER]: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER],
    [UK_CONTENT_PERCENTAGE]: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
    [AMOUNT]: formatCurrency(answers[AMOUNT], 'GBP'),
    [CURRENCY]: mapCurrency(answers[CURRENCY]),
    [PRE_CREDIT_PERIOD]: mapPreCreditPeriod(answers[PRE_CREDIT_PERIOD]),
    [CREDIT_PERIOD]: mapPeriodDays(answers[CREDIT_PERIOD]),
    [POLICY_TYPE]: answers[POLICY_TYPE],
    [POLICY_LENGTH]: mapPeriodMonths(answers[POLICY_LENGTH]),
  };

  return mapped;
};

module.exports = {
  mapPeriodDays,
  mapPeriodMonths,
  mapCurrency,
  mapPreCreditPeriod,
  mapAnswersToContent,
};
