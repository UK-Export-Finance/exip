import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import { isNumber, numberHasDecimal } from '../../../../../../helpers/number';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

const MINIMUM = 1;
const MAXIMUM = 499999;

/**
 * totalContractValueRules
 * Check submitted form data for errors with the total contract value field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalContractValueRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  // check if the field is not a number
  if (!isNumber(formBody[FIELD_ID])) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, errors);
  }

  // check if the field is not a whole number
  if (numberHasDecimal(formBody[FIELD_ID])) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_WHOLE_NUMBER, errors);
  }

  // check if the field is below the minimum
  if (Number(formBody[FIELD_ID]) < MINIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, errors);
  }

  // check if the field is above the maximum
  if (Number(formBody[FIELD_ID]) > MAXIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};

export default totalContractValueRules;
