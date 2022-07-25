const { FIELD_IDS } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');

const amountRules = (submittedData, errors) => {
  let updatedErrors = errors;

  if (!objectHasProperty(submittedData, FIELD_IDS.PERCENTAGE_OF_COVER)) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.PERCENTAGE_OF_COVER,
      ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY,
      errors,
    );

    return updatedErrors;
  }

  return updatedErrors;
};

module.exports = amountRules;
