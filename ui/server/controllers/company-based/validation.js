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
    || !objectHasProperty(formBody, FIELDS.VALID_COMPANY_BASE));

  if (hasErrors) {
    errors = generateValidationErrors(
      FIELDS.VALID_COMPANY_BASE,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.VALID_COMPANY_BASE],
    );

    return errors;
  }

  return null;
};

module.exports = validation;
