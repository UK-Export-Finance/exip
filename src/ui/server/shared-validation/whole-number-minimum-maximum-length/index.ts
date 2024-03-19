import { RequestBody, ErrorMessageObject } from '../../../types';
import { objectHasProperty } from '../../helpers/object';
import { stripCommas } from '../../helpers/string';
import generateValidationErrors from '../../helpers/validation';
import wholeNumberValidation from '../../helpers/whole-number-validation';
import { isNumberAboveMaximum, isNumberBelowMinimum } from '../../helpers/number';

/**
 * wholeNumberMinimumMaximumLength
 * Check if a number is provided and its length is within the minimum and maximum length
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors: Other validation errors for the same form
 * @param {Number} minimum minimum length to check against
 * @param {Number} maximum maximum length to check against
 * @returns {Object} Validation errors or null
 */
const wholeNumberMinimumMaximumLength = (
  formBody: RequestBody,
  fieldId: string,
  errorMessage: ErrorMessageObject,
  errors: object,
  minimum: number,
  maximum: number,
) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage.IS_EMPTY, errors);
  }

  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[fieldId]);

  // check if the field is a whole number.
  updatedErrors = wholeNumberValidation(formBody, updatedErrors, errorMessage.INCORRECT_FORMAT, fieldId);

  // check if the field is below the minimum
  if (isNumberBelowMinimum(numberWithoutCommas.length, minimum)) {
    return generateValidationErrors(fieldId, errorMessage.BELOW_MINIMUM, errors);
  }

  // check if the field is above the maximum
  if (isNumberAboveMaximum(numberWithoutCommas.length, maximum)) {
    return generateValidationErrors(fieldId, errorMessage.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};

export default wholeNumberMinimumMaximumLength;
