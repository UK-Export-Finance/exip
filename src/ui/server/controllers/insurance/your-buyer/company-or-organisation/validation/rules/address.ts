import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { ADDRESS: FIELD_ID },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

export const MAXIMUM = 300;

/**
 * addressRules
 * Check submitted form data for errors with the address field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const addressRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;

  // check if the field is empty
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  // check if the field is above the maximum
  if (formBody[FIELD_ID].length > MAXIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};

export default addressRules;
