const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const MINIMUM = 1;

const amountRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.AMOUNT)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY,
      errors,
    );

    return updatedErrors;
  }

  if (!isNumber(Number(formBody[FIELD_IDS.AMOUNT]))) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER,
      errors,
    );

    return updatedErrors;
  }

  if (Number(formBody[FIELD_IDS.AMOUNT]) < MINIMUM) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM,
      errors,
    );

    return updatedErrors;
  }

  return updatedErrors;
};

module.exports = amountRules;
