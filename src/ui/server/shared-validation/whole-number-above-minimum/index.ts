import { RequestBody, ErrorMessageObject } from '../../../types';
import { objectHasProperty } from '../../helpers/object';
import { stripCommas } from '../../helpers/string';
import generateValidationErrors from '../../helpers/validation';
import wholeNumberValidation from '../../helpers/whole-number-validation';

/**
 * wholeNumberAboveMinimumValidation
 * Check if a number is provided and below a minimum.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors object from previous validation errors
 * @param {Number} minimum minimum value to check against
 * @returns {Object} Validation errors or null
 */
const wholeNumberAboveMinimumValidation = (formBody: RequestBody, fieldId: string, errorMessage: ErrorMessageObject, errors: object, minimum: number) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage.IS_EMPTY, errors);
  }

  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[fieldId]);

  // check if the field is a whole number.
  updatedErrors = wholeNumberValidation(formBody, updatedErrors, errorMessage.INCORRECT_FORMAT, fieldId);

  // check if the field is below the minimum
  if (Number(numberWithoutCommas) < minimum) {
    return generateValidationErrors(fieldId, errorMessage.BELOW_MINIMUM, errors);
  }

  return updatedErrors;
};

export default wholeNumberAboveMinimumValidation;
