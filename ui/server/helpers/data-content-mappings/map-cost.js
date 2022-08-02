const { FIELD_IDS, FIELD_VALUES } = require('../../constants');
const formatCurrency = require('../format-currency');

const {
  CONTRACT_VALUE,
  CURRENCY,
  POLICY_TYPE,
  MAX_AMOUNT_OWED,
} = FIELD_IDS;

// TODO: use is single/multi helpers

const mapCost = (answers) => {
  let mapped;

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    mapped = {
      [CONTRACT_VALUE]: {
        text: formatCurrency(answers[CONTRACT_VALUE], answers[CURRENCY].isoCode),
      },
    };
  }

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI) {
    mapped = {
      [MAX_AMOUNT_OWED]: {
        text: formatCurrency(answers[MAX_AMOUNT_OWED], answers[CURRENCY].isoCode),
      },
    };
  }

  return mapped;
};

module.exports = mapCost;
