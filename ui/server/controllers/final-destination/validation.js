const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');
const {
  objectHasValues,
  objectHasProperty,
} = require('../../helpers/object');

const hasErrors = (formBody) => {
  if (!objectHasValues(formBody)) {
    return true;
  }

  const keys = Object.keys(formBody);
  if (keys.includes(FIELDS.FINAL_DESTINATION) && keys.includes(FIELDS.COUNTRY)) {
    // form submitted without client side JS

    if (!objectHasProperty(formBody, FIELDS.COUNTRY)) {
      return true;
    }

    return false;
  }

  if (!objectHasProperty(formBody, FIELDS.FINAL_DESTINATION)) {
    // form submitted with client side JS
    return true;
  }

  return false;
};

const validation = (formBody) => {
  let errors;

  if (hasErrors(formBody)) {
    errors = generateValidationErrors(
      FIELDS.COUNTRY,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.COUNTRY],
    );

    return errors;
  }

  return null;
};

module.exports = {
  hasErrors,
  validation,
};
