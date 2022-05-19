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
    || !objectHasProperty(formBody, FIELDS.TRIED_PRIVATE_COVER));

  if (hasErrors) {
    errors = generateValidationErrors(
      FIELDS.TRIED_PRIVATE_COVER,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.TRIED_PRIVATE_COVER],
    );

    return errors;
  }

  return null;
};

module.exports = validation;
