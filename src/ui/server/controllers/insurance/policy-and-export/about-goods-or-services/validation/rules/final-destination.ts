import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY_AND_EXPORTS: {
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

export const MAXIMUM = 1000;

/**
 * finalDestinationRules
 * Check submitted form data for errors with the final destination field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const finalDestinationRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return updatedErrors;
};

export default finalDestinationRules;
