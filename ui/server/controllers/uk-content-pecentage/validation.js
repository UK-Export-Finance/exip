const { FIELD_IDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');
const {
  objectHasValues,
  objectHasProperty,
} = require('../../helpers/object');

const validation = (formBody) => {
  let errors;

  const hasErrors = (!objectHasValues(formBody)
    || !objectHasProperty(formBody, FIELD_IDS.UK_CONTENT_PERCENTAGE));

  if (hasErrors) {
    errors = generateValidationErrors(
      FIELD_IDS.UK_CONTENT_PERCENTAGE,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].IS_EMPTY,
    );

    return errors;
  }

  return null;
};

module.exports = validation;
