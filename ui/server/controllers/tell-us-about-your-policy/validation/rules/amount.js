const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const { numberHasDecimal } = require('../../../../helpers/number');
const { stripCommas } = require('../../../../helpers/string');

const MINIMUM = 1;

const hasDisllowedCharacters = (str) => {
  const disllowedValues = str.replace(/[0-9,]/g, '');

  if (disllowedValues.length) {
    return true;
  }

  return false;
};

const amountRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.AMOUNT)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY,
      errors,
    );

    return updatedErrors;
  }

  const submittedValue = formBody[FIELD_IDS.AMOUNT];

  if (numberHasDecimal(submittedValue)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_WHOLE_NUMBER,
      errors,
    );

    return updatedErrors;
  }

  if (hasDisllowedCharacters(submittedValue)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER,
      errors,
    );

    return updatedErrors;
  }

  const cleanString = stripCommas(submittedValue);

  if (Number(cleanString) < MINIMUM) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.AMOUNT,
      ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM,
      errors,
    );

    return updatedErrors;
  }

  return updatedErrors;
};

module.exports = {
  hasDisllowedCharacters,
  amountRules,
};
