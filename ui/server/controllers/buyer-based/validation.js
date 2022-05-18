const CONSTANTS = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');
const {
  objectHasValues,
  objectHasProperty,
} = require('../../helpers/object');

const validation = (formBody) => {
  let errors;

  const hasErrors = (!objectHasValues(formBody)
    || !objectHasProperty(formBody, CONSTANTS.FIELDS.VALID_BUYER_BASE));

  if (hasErrors) {
    errors = generateValidationErrors(
      CONSTANTS.FIELDS.VALID_BUYER_BASE,
      CONTENT_STRINGS.ERROR_MESSAGES[CONSTANTS.FIELDS.VALID_BUYER_BASE],
    );

    return errors;
  }

  return null;
};

module.exports = validation;
