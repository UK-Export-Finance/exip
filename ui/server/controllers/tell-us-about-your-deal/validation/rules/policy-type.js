const { FIELDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');

const policyTypeRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELDS.POLICY_TYPE)) {
    updatedErrors = generateValidationErrors(
      FIELDS.POLICY_TYPE,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.POLICY_TYPE],
      errors,
    );
  }

  return updatedErrors;
};

module.exports = policyTypeRules;
