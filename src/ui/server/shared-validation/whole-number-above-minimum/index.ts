import { RequestBody } from '../../../types';
import { stripCommas } from '../../helpers/string';
import generateValidationErrors from '../../helpers/validation';

/**
 * wholeNumberAboveMinimumValidation
 * Check if a number is below minimum
 * Returns validationErrors or null.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors object from previous validation errors
 * @param {Number} minimum minimum value to check against
 * @returns {Object} Validation errors or null
 */
const wholeNumberAboveMinimumValidation = (formBody: RequestBody, fieldId: string, errorMessage: string, errors: object, minimum: number) => {
  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[fieldId]);

  // check if the field is below the minimum
  if (Number(numberWithoutCommas) < minimum) {
    return generateValidationErrors(fieldId, errorMessage, errors);
  }

  return null;
};

export default wholeNumberAboveMinimumValidation;
