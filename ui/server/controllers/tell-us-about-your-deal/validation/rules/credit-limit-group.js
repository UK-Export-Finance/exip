const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');

const creditLimitGroupRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELDS.CREDIT_LIMIT_CURRENCY)
    || !objectHasProperty(formBody, FIELDS.CREDIT_LIMIT)) {
    updatedErrors = generateValidationErrors(
      FIELDS.CREDIT_LIMIT_GROUP,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.CREDIT_LIMIT_GROUP].IS_EMPTY,
      errors,
    );
  }

  return updatedErrors;
};

module.exports = creditLimitGroupRules;
