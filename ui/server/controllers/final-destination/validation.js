const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');
const {
  objectHasValues,
  objectHasProperty,
} = require('../../helpers/object');

const validation = (formBody) => {
  let errors;

  const hasErrors = (!objectHasValues(formBody)
    || !objectHasProperty(formBody, FIELDS.FINAL_DESTINATION));

  if (hasErrors) {
    errors = generateValidationErrors(
      FIELDS.COUNTRY_SEARCH,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.COUNTRY_SEARCH],
    );

    return errors;
  }

  return null;
};

module.exports = validation;
