const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const { isNumber, numberHasDecimal } = require('../../../../helpers/number');

const MINIMUM = 0;

const preCreditPeriodRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, FIELD_IDS.PRE_CREDIT_PERIOD)) {
    if (numberHasDecimal(formBody[FIELD_IDS.PRE_CREDIT_PERIOD])) {
      updatedErrors = generateValidationErrors(
        FIELD_IDS.PRE_CREDIT_PERIOD,
        ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
        updatedErrors,
      );

      return updatedErrors;
    }

    if (!isNumber(Number(formBody[FIELD_IDS.PRE_CREDIT_PERIOD]))) {
      updatedErrors = generateValidationErrors(
        FIELD_IDS.PRE_CREDIT_PERIOD,
        ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER,
        errors,
      );

      return updatedErrors;
    }

    if (Number(formBody[FIELD_IDS.PRE_CREDIT_PERIOD]) < MINIMUM) {
      updatedErrors = generateValidationErrors(
        FIELD_IDS.PRE_CREDIT_PERIOD,
        ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].BELOW_MINIMUM,
        errors,
      );

      return updatedErrors;
    }
  }

  return updatedErrors;
};

module.exports = preCreditPeriodRules;
