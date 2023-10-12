import { FIELD_IDS, APPLICATION } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { stripCommas } from '../../../../../../helpers/string';
import { RequestBody } from '../../../../../../../types';

const { MINIMUM, MAXIMUM } = APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

/**
 * totalContractValueRules
 * Check submitted form data for errors with the total contract value field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalContractValueRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  // check if the field is a whole number.
  updatedErrors = wholeNumberValidation(formBody, updatedErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[FIELD_ID]);

  // check if the field is below the minimum
  if (Number(numberWithoutCommas) < MINIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, errors);
  }

  // check if the field is above the maximum
  if (Number(numberWithoutCommas) > MAXIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};

export default totalContractValueRules;
