import { RequestBody } from '../../../types';
import generateValidationErrors from '../validation';
import { isNumber, numberHasDecimal, isNumberBelowMinimum } from '../number';
import { stripCommas } from '../string';

/**
 * validates if field is whole number and above 0 and handles commas in the input.
 * if allowNegativeNumbers is set to true, then will return validation error if number below 0.
 * returns validation error if is not a number, has a decimal place or special characters.
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @param {string} errorMessage
 * @param {string} field fieldId of the field being checked
 * @param {Boolean} allowNegativeValue false as default, if true then allows for negative numbers below 0.
 * @returns {Object} errors
 */
const wholeNumberValidation = (formBody: RequestBody, errors: object, errorMessage: string, field: string, allowNegativeValue = false) => {
  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[field]);

  const isFieldANumber = isNumber(numberWithoutCommas);
  const hasDecimal = numberHasDecimal(Number(numberWithoutCommas));

  let isBelowMinimum = false;

  // if flag is false, then number cannot be below 0
  if (!allowNegativeValue) {
    isBelowMinimum = isNumberBelowMinimum(Number(numberWithoutCommas), 0);
  }

  if (!isFieldANumber || hasDecimal || isBelowMinimum) {
    return generateValidationErrors(field, errorMessage, errors);
  }

  return errors;
};

export default wholeNumberValidation;
