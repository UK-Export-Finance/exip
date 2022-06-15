const { FIELD_IDS, FIELD_VALUES } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const MINIMUM = 1;
const SINGLE_POLICY_MAX_MONTHS = 24;
const MULTI_POLICY_MAX_MONTHS = 12;

const policyLengthRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, FIELD_IDS.POLICY_TYPE)) {
    const isSinglePolicy = (formBody[FIELD_IDS.POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE);
    const isMultiPolicy = (formBody[FIELD_IDS.POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI);

    if (isSinglePolicy) {
      if (!objectHasProperty(formBody, FIELD_IDS.SINGLE_POLICY_LENGTH)) {
        const errorMessage = ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY;

        updatedErrors = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          errorMessage,
          errors,
        );

        return updatedErrors;
      }

      if (!isNumber(Number(formBody[FIELD_IDS.SINGLE_POLICY_LENGTH]))) {
        updatedErrors = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
          updatedErrors,
        );

        return updatedErrors;
      }

      if (Number(formBody[FIELD_IDS.SINGLE_POLICY_LENGTH]) < MINIMUM) {
        updatedErrors = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
          updatedErrors,
        );

        return updatedErrors;
      }

      if (Number(formBody[FIELD_IDS.SINGLE_POLICY_LENGTH]) > SINGLE_POLICY_MAX_MONTHS) {
        updatedErrors = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
          updatedErrors,
        );

        return updatedErrors;
      }
    }

    if (isMultiPolicy) {
      if (!objectHasProperty(formBody, FIELD_IDS.MULTI_POLICY_LENGTH)) {
        const errorMessage = ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY;

        updatedErrors = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          errorMessage,
          errors,
        );

        return updatedErrors;
      }

      if (!isNumber(Number(formBody[FIELD_IDS.MULTI_POLICY_LENGTH]))) {
        updatedErrors = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER,
          updatedErrors,
        );

        return updatedErrors;
      }

      if (Number(formBody[FIELD_IDS.MULTI_POLICY_LENGTH]) < MINIMUM) {
        updatedErrors = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM,
          updatedErrors,
        );

        return updatedErrors;
      }

      if (Number(formBody[FIELD_IDS.MULTI_POLICY_LENGTH]) > MULTI_POLICY_MAX_MONTHS) {
        updatedErrors = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM,
          updatedErrors,
        );

        return updatedErrors;
      }
    }
  }

  return updatedErrors;
};

module.exports = policyLengthRules;
