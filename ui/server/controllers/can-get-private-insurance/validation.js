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
    || !objectHasProperty(formBody, FIELD_IDS.CAN_GET_PRIVATE_INSURANCE));

  if (hasErrors) {
    errors = generateValidationErrors(
      FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
    );

    return errors;
  }

  return null;
};

module.exports = validation;
