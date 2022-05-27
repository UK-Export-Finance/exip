const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const creditPeriodRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELDS.CREDIT_PERIOD)) {
    updatedErrors = generateValidationErrors(
      FIELDS.CREDIT_PERIOD,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_PERIOD].IS_EMPTY,
      errors,
    );
  } else if (!isNumber(Number(formBody[FIELDS.CREDIT_PERIOD]))) {
    updatedErrors = generateValidationErrors(
      FIELDS.CREDIT_PERIOD,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_PERIOD].NOT_A_NUMBER,
      updatedErrors,
    );
  }

  return updatedErrors;
};

module.exports = creditPeriodRules;
