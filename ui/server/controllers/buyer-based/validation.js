const { FIELD_IDS } = require('../../constants');
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
  if (keys.includes(FIELD_IDS.BUYER_COUNTRY) && keys.includes(FIELD_IDS.COUNTRY)) {
    // form submitted without client side JS

    if (!objectHasProperty(formBody, FIELD_IDS.COUNTRY)) {
      return true;
    }

    return false;
  }

  if (!objectHasProperty(formBody, FIELD_IDS.BUYER_COUNTRY)) {
    // form submitted with client side JS
    return true;
  }

  return false;
};

const validation = (formBody) => {
  let errors;

  if (hasErrors(formBody)) {
    errors = generateValidationErrors(
      FIELD_IDS.COUNTRY,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.COUNTRY],
    );

    return errors;
  }

  return null;
};

module.exports = {
  hasErrors,
  validation,
};
