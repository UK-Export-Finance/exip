const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');

const creditLimitGroupRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.CREDIT_LIMIT_CURRENCY)
    || !objectHasProperty(formBody, FIELD_IDS.CREDIT_LIMIT)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_LIMIT_GROUP,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY,
      errors,
    );
  }

  return updatedErrors;
};

module.exports = creditLimitGroupRules;
