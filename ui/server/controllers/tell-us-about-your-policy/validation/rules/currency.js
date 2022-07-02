const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');

const currencyRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.CURRENCY)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CURRENCY,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY,
      errors,
    );
  }

  return updatedErrors;
};

module.exports = currencyRules;
