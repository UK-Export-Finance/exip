import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    POLICY: {
      ABOUT_GOODS_OR_SERVICES: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

export const MAXIMUM = 1000;

/**
 * descriptionRules
 * Check submitted form data for errors with the description field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const descriptionRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  // check if the field is above the maximum
  if (formBody[FIELD_ID].length > MAXIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};

export default descriptionRules;
