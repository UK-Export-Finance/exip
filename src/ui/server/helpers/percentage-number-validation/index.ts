import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../constants';
import generateValidationErrors from '../validation';
import { objectHasProperty } from '../object';
import { isNumber, numberHasDecimal, isNumberBelowMinimum, isNumberAboveMaximum } from '../number';
import { RequestBody, ErrorMessageObject } from '../../../types';

/**
 * percentageNumberValidation
 * validates if field is empty or not
 * validates if field is whole number and between 0 and 100.
 * returns validation error if is not a number, has a decimal place, special characters, a comma, is empty or is below 0 or above 100.
 * @param {RequestBody} formBody
 * @param {String} field: Field ID of the field being checked
 * @param {Object} errors: Other validation errors for the same form
 * @param {ErrorMessageObject} errorMessages: object with different error messages
 * @param {Integer} minimum: Minimum allowed percentage. Defaults to MINIMUM_CHARACTERS.ZERO
 * @returns {Object} errors
 */
const percentageNumberValidation = (
  formBody: RequestBody,
  field: string,
  errors: object,
  errorMessages: ErrorMessageObject,
  minimum = MINIMUM_CHARACTERS.ZERO,
) => {
  const { IS_EMPTY, INCORRECT_FORMAT, BELOW_MINIMUM, ABOVE_MAXIMUM } = errorMessages;

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

  if (isNumberBelowMinimum(Number(value), minimum)) {
    return generateValidationErrors(field, BELOW_MINIMUM, errors);
  }

  if (isNumberAboveMaximum(Number(value), MAXIMUM_CHARACTERS.PERCENTAGE)) {
    return generateValidationErrors(field, ABOVE_MAXIMUM, errors);
  }

  return errors;
};

export default percentageNumberValidation;
