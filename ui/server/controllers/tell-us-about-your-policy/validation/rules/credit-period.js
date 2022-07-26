const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { isMultiPolicyType } = require('../../../../helpers/policy-type');
const { objectHasProperty } = require('../../../../helpers/object');
const { isNumber, numberHasDecimal } = require('../../../../helpers/number');

const {
  CREDIT_PERIOD,
  POLICY_TYPE,
} = FIELD_IDS;

const MINIMUM = 1;
const MAXIMUM = 2;

const creditPeriodRules = (submittedData, errors) => {
  let updatedErrors = errors;

  if (isMultiPolicyType(submittedData[POLICY_TYPE])) {
    if (!objectHasProperty(submittedData, CREDIT_PERIOD)) {
      updatedErrors = generateValidationErrors(
        CREDIT_PERIOD,
        ERROR_MESSAGES[CREDIT_PERIOD].IS_EMPTY,
        errors,
      );

      return updatedErrors;
    }

    if (numberHasDecimal(submittedData[CREDIT_PERIOD])) {
      updatedErrors = generateValidationErrors(
        CREDIT_PERIOD,
        ERROR_MESSAGES[CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
        updatedErrors,
      );

      return updatedErrors;
    }

    if (!isNumber(Number(submittedData[CREDIT_PERIOD]))) {
      updatedErrors = generateValidationErrors(
        CREDIT_PERIOD,
        ERROR_MESSAGES[CREDIT_PERIOD].NOT_A_NUMBER,
        updatedErrors,
      );

      return updatedErrors;
    }

    if (Number(submittedData[CREDIT_PERIOD]) < MINIMUM) {
      updatedErrors = generateValidationErrors(
        CREDIT_PERIOD,
        ERROR_MESSAGES[CREDIT_PERIOD].BELOW_MINIMUM,
        errors,
      );

      return updatedErrors;
    }

    if (Number(submittedData[CREDIT_PERIOD]) > MAXIMUM) {
      updatedErrors = generateValidationErrors(
        CREDIT_PERIOD,
        ERROR_MESSAGES[CREDIT_PERIOD].ABOVE_MAXIMUM,
        errors,
      );

      return updatedErrors;
    }
  }

  return updatedErrors;
};

module.exports = creditPeriodRules;
