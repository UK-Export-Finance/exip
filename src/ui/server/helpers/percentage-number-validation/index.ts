import { RequestBody, Errors } from '../../../types';
import generateValidationErrors from '../validation';
import { isNumber, numberHasDecimal, isNumberBelowMinimum, isNumberAboveMaximum } from '../number';

const MINIMUM = 0;
const MAXIMUM = 100;

/**
 * percentageNumberValidation
 * validates if field is whole number and between 0 and 100.
 * returns validation error if is not a number, has a decimal place or special characters or a comma or is below 0 or above 100.
 * @param {RequestBody} responseBody
 * @param {String} field fieldId of the field being checked
 * @param {object} errors
 * @param {Errors} errorMessages object with different error messages
 * @returns {object} errors
 */
const percentageNumberValidation = (responseBody: RequestBody, field: string, errors: object, errorMessages: Errors) => {
  const { INCORRECT_FORMAT, BELOW_MINIMUM, ABOVE_MAXIMUM } = errorMessages;

  const value = responseBody[field];

  const isFieldANumber = isNumber(value);
  const hasDecimal = numberHasDecimal(Number(value));

  // if the incorrect format
  if (!isFieldANumber || hasDecimal) {
    return generateValidationErrors(field, INCORRECT_FORMAT, errors);
  }

  // if below the set minimum
  if (isNumberBelowMinimum(Number(value), MINIMUM)) {
    return generateValidationErrors(field, BELOW_MINIMUM, errors);
  }

  // if above the set maximum
  if (isNumberAboveMaximum(Number(value), MAXIMUM)) {
    return generateValidationErrors(field, ABOVE_MAXIMUM, errors);
  }

  return errors;
};

export default percentageNumberValidation;
