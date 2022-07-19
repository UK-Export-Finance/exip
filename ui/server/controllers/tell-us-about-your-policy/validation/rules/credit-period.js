const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const { isNumber, numberHasDecimal } = require('../../../../helpers/number');

const MINIMUM = 1;
const MAXIMUM = 2;

const creditPeriodRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.CREDIT_PERIOD)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_PERIOD,
      ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
      errors,
    );

    return updatedErrors;
  }

  if (numberHasDecimal(formBody[FIELD_IDS.CREDIT_PERIOD])) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_PERIOD,
      ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
      updatedErrors,
    );

    return updatedErrors;
  }

  if (!isNumber(Number(formBody[FIELD_IDS.CREDIT_PERIOD]))) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_PERIOD,
      ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER,
      updatedErrors,
    );

    return updatedErrors;
  }

  if (Number(formBody[FIELD_IDS.CREDIT_PERIOD]) < MINIMUM) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_PERIOD,
      ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM,
      errors,
    );

    return updatedErrors;
  }

  if (Number(formBody[FIELD_IDS.CREDIT_PERIOD]) > MAXIMUM) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_PERIOD,
      ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].ABOVE_MAXIMUM,
      errors,
    );

    return updatedErrors;
  }

  return updatedErrors;
};

module.exports = creditPeriodRules;
