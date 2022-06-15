const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY } = require('../content-strings');
const formatCurrency = require('./format-currency');

const mapPeriodDays = (answer) => `${answer} days`;
const mapPeriodMonths = (answer) => `${answer} months`;

const mapAnswersToContent = (answers) => {
  const {
    VALID_COMPANY_BASE,
    VALID_BUYER_BASE,
    TRIED_PRIVATE_COVER,
    FINAL_DESTINATION,
    UK_CONTENT_PERCENTAGE,
    // CURRENCY,
    AMOUNT,
    PRE_CREDIT_PERIOD,
    CREDIT_PERIOD,
    POLICY_LENGTH,
    POLICY_TYPE,
  } = FIELD_IDS;

  const mapped = {
    [VALID_COMPANY_BASE]: SUMMARY[VALID_COMPANY_BASE],
    [VALID_BUYER_BASE]: SUMMARY[VALID_BUYER_BASE],
    [TRIED_PRIVATE_COVER]: SUMMARY[TRIED_PRIVATE_COVER],
    [FINAL_DESTINATION]: answers[FINAL_DESTINATION],
    [UK_CONTENT_PERCENTAGE]: SUMMARY[UK_CONTENT_PERCENTAGE],
    // CURRENCY
    [AMOUNT]: formatCurrency(answers[AMOUNT], 'GBP'),
    [PRE_CREDIT_PERIOD]: mapPeriodDays(answers[PRE_CREDIT_PERIOD]),
    [CREDIT_PERIOD]: mapPeriodDays(answers[CREDIT_PERIOD]),
    [POLICY_LENGTH]: mapPeriodMonths(answers[POLICY_LENGTH]),
    [POLICY_TYPE]: answers[POLICY_TYPE],
  };

  return mapped;
};

module.exports = {
  mapPeriodDays,
  mapPeriodMonths,
  mapAnswersToContent,
};
