const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const policyLengthRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELDS.POLICY_LENGTH)) {
    updatedErrors = generateValidationErrors(
      FIELDS.POLICY_LENGTH,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.POLICY_LENGTH].IS_EMPTY,
      errors,
    );
  } else if (!isNumber(Number(formBody[FIELDS.POLICY_LENGTH]))) {
    updatedErrors = generateValidationErrors(
      FIELDS.POLICY_LENGTH,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.POLICY_LENGTH].NOT_A_NUMBER,
      updatedErrors,
    );
  }

  return updatedErrors;
};

module.exports = policyLengthRules;
