import { RequestBody } from 'express';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { objectHasProperty } from '../../../../../helpers/object';
import { ERROR_MESSAGES } from '../../../../../content-strings';

const {
  INSURANCE: {
    YOUR_BUYER: { BUYER_ADDRESS },
  },
} = ERROR_MESSAGES;

const { YOUR_BUYER } = FIELDS;

/**
 * addressRules.
 * Check submitted form data for errors with the all mandatory fields
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
export const addressRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;
  // check if the Country field is empty.
  if (!objectHasProperty(formBody, YOUR_BUYER.BUYER_ADDRESS.ID)) {
    return generateValidationErrors(YOUR_BUYER.BUYER_ADDRESS.ID, BUYER_ADDRESS.IS_EMPTY, errors);
  }
  // check the  length of character
  if (Object.keys(formBody[YOUR_BUYER.BUYER_ADDRESS.ID]).length > YOUR_BUYER.BUYER_ADDRESS.MAX_LENGTH) {
    return generateValidationErrors(YOUR_BUYER.BUYER_ADDRESS.ID, BUYER_ADDRESS.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};
