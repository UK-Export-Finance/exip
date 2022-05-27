const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const preCreditPeriodRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, FIELDS.PRE_CREDIT_PERIOD) && !isNumber(Number(formBody[FIELDS.PRE_CREDIT_PERIOD]))) {
    updatedErrors = generateValidationErrors(
      FIELDS.PRE_CREDIT_PERIOD,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER,
      errors,
    );
  }

  return updatedErrors;
};

module.exports = preCreditPeriodRules;
