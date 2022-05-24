const { FIELDS } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');
const generateValidationErrors = require('../../helpers/validation');
const {
  objectHasValues,
  objectHasProperty,
} = require('../../helpers/object');
const isNumber = require('../../helpers/number');

const getValidationErrors = (message) =>
  generateValidationErrors(
    FIELDS.UK_CONTENT_PERCENTAGE,
    message,
  );

const validation = (formBody) => {
  let errors;

  const hasNoValue = (!objectHasValues(formBody)
    || !objectHasProperty(formBody, FIELDS.UK_CONTENT_PERCENTAGE));

  if (hasNoValue) {
    errors = getValidationErrors(CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.UK_CONTENT_PERCENTAGE].IS_EMPTY);

    return errors;
  }

  const submittedValue = formBody[FIELDS.UK_CONTENT_PERCENTAGE];

  if (!isNumber(Number(submittedValue))) {
    errors = getValidationErrors(CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.UK_CONTENT_PERCENTAGE].NOT_A_NUMBER);

    return errors;
  }

  if (Number(submittedValue) < 0) {
    errors = getValidationErrors(CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.UK_CONTENT_PERCENTAGE].BELOW_MINIMUM);

    return errors;
  }

  if (Number(submittedValue) > 100) {
    errors = getValidationErrors(CONTENT_STRINGS.ERROR_MESSAGES[FIELDS.UK_CONTENT_PERCENTAGE].ABOVE_MAXIMUM);

    return errors;
  }

  return null;
};

module.exports = {
  getValidationErrors,
  validation,
};
