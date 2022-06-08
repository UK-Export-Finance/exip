const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const preCreditPeriodRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, FIELD_IDS.PRE_CREDIT_PERIOD) && !isNumber(Number(formBody[FIELD_IDS.PRE_CREDIT_PERIOD]))) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.PRE_CREDIT_PERIOD,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER,
      errors,
    );
  }

  return updatedErrors;
};

module.exports = preCreditPeriodRules;
