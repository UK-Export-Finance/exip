const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');

const policyTypeRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.POLICY_TYPE)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.SINGLE_POLICY_TYPE,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE],
      errors,
    );
  }

  return updatedErrors;
};

module.exports = policyTypeRules;
