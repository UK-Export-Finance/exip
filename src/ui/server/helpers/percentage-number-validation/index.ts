import generateValidationErrors from '../validation';
import { objectHasProperty } from '../object';
import { isNumber, numberHasDecimal, isNumberBelowMinimum, isNumberAboveMaximum } from '../number';
import { RequestBody, ErrorMessageObject } from '../../../types';

const MINIMUM = 0;
const MAXIMUM = 100;

/**
 * percentageNumberValidation
 * validates if field is empty or not
 * validates if field is whole number and between 0 and 100.
 * returns validation error if is not a number, has a decimal place, special characters, a comma, is empty or is below 0 or above 100.
 * @param {RequestBody} formBody
 * @param {String} field fieldId of the field being checked
 * @param {Object} errors
 * @param {ErrorMessageObject} errorMessages object with different error messages
 * @returns {Object} errors
 */
const percentageNumberValidation = (formBody: RequestBody, field: string, errors: object, errorMessages: ErrorMessageObject) => {
  const { IS_EMPTY, INCORRECT_FORMAT, BELOW_MINIMUM, ABOVE_MAXIMUM } = errorMessages;

  // if empty then return validation error
  if (!objectHasProperty(formBody, field)) {
    return generateValidationErrors(field, IS_EMPTY, errors);
  }

  const value = formBody[field];

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
