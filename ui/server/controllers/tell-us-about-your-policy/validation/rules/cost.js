const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const { isSinglePolicyType, isMultiPolicyType } = require('../../../../helpers/policy-type');
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

const costRules = (submittedData, errors) => {
  let updatedErrors = errors;

  let fieldId;

  if (isSinglePolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    fieldId = FIELD_IDS.CONTRACT_VALUE;
  }

  if (isMultiPolicyType(submittedData[FIELD_IDS.POLICY_TYPE])) {
    fieldId = FIELD_IDS.MAX_AMOUNT_OWED;
  }

  if (!objectHasProperty(submittedData, fieldId)) {
    updatedErrors = generateValidationErrors(
      fieldId,
      ERROR_MESSAGES[fieldId].IS_EMPTY,
      errors,
    );

    return updatedErrors;
  }

  if (numberHasDecimal(submittedData[fieldId])) {
    updatedErrors = generateValidationErrors(
      fieldId,
      ERROR_MESSAGES[fieldId].NOT_A_WHOLE_NUMBER,
      errors,
    );

    return updatedErrors;
  }

  if (hasDisllowedCharacters(submittedData[fieldId])) {
    updatedErrors = generateValidationErrors(
      fieldId,
      ERROR_MESSAGES[fieldId].NOT_A_NUMBER,
      errors,
    );

    return updatedErrors;
  }

  const cleanString = stripCommas(submittedData[fieldId]);

  if (Number(cleanString) < MINIMUM) {
    updatedErrors = generateValidationErrors(
      fieldId,
      ERROR_MESSAGES[fieldId].BELOW_MINIMUM,
      errors,
    );

    return updatedErrors;
  }

  return updatedErrors;
};

module.exports = {
  hasDisllowedCharacters,
  costRules,
};
