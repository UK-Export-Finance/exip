import { RequestBody } from '../../../types';
import generateValidationErrors from '../validation';
import { isNumber, numberHasDecimal, isNumberBelowMinimum } from '../number';

/**
 * validates if field is whole number and above 0
 * returns validation error if is not a number, has a decimal place or special characters or is below 0
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @param {object} errorField error field to get the error message
 * @param {string} field fieldId of the field being checked
 * @returns {object} errors
 */
const wholeNumberValidation = (responseBody: RequestBody, errors: object, errorField: object, field: string) => {
  const hasDecimal = numberHasDecimal(Number(responseBody[field]));
  const isBelowMinimum = isNumberBelowMinimum(Number(responseBody[field]), 0);

  if (!isNumber(responseBody[field]) || hasDecimal || isBelowMinimum) {
    const errorMessage = errorField[field].INCORRECT_FORMAT;

    return generateValidationErrors(field, errorMessage, errors);
  }

  return errors;
};

export default wholeNumberValidation;
