import { RequestBody } from '../../../types';
import generateValidationErrors from '../validation';
import { isNumber, numberHasDecimal, isNumberBelowMinimum } from '../number';
import { stripCommas } from '../string';

/**
 * validates if field is whole number and above 0 and handles commas in the input
 * returns validation error if is not a number, has a decimal place or special characters or is below 0
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @param {string} errorMessage
 * @param {string} field fieldId of the field being checked
 * @param {number} minimum optional minimum value of field - default 0
 * @returns {object} errors
 */
const wholeNumberValidation = (responseBody: RequestBody, errors: object, errorMessage: string, field: string, minimum = 0) => {
  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(responseBody[field]);

  const isFieldANumber = isNumber(numberWithoutCommas);
  const hasDecimal = numberHasDecimal(Number(numberWithoutCommas));
  const isBelowMinimum = isNumberBelowMinimum(Number(numberWithoutCommas), minimum);

  if (!isFieldANumber || hasDecimal || isBelowMinimum) {
    return generateValidationErrors(field, errorMessage, errors);
  }

  return errors;
};

export default wholeNumberValidation;
