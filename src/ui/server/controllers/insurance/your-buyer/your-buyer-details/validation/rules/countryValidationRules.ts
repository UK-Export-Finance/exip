import { RequestBody } from 'express';
import generateValidationErrors from '../../../../../../helpers/validation';
import { yourBuyerFiledVariables } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { objectHasProperty } from '../../../../../../helpers/object';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
/**
 * countryValidationRules
 * Check submitted form data for errors with the total contract value field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
export const countryValidationRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;
  const FIELD_ID = yourBuyerFiledVariables.FIELDS.BUYER_COUNTRY.ID;
  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGES[FIELD_IDS.COUNTRY].IS_EMPTY, errors);
  }
  return updatedErrors;
};
