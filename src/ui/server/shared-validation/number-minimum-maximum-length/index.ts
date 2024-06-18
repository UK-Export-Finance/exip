import { ValidationWholeNumberMinMaxParams } from '../../../types';
import { objectHasProperty } from '../../helpers/object';
import { stripCommas } from '../../helpers/string';
import generateValidationErrors from '../../helpers/validation';
import numberValidation from '../../helpers/number-validation';
import { isNumberAboveMaximum, isNumberBelowMinimum } from '../../helpers/number';

/**
 * numberMinimumMaximumLength
 * Check if a number is provided and its length is within the minimum and maximum length
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors: Other validation errors for the same form
 * @param {Number} minimum minimum length to check against
 * @param {Number} maximum maximum length to check against
 * @param {Boolean} allowDecimalPlaces false as default, if true then allows for decimal places.
 * @returns {ValidationErrors} or null
 */
const numberMinimumMaximumLength = ({
  formBody,
  fieldId,
  errorMessage,
  errors,
  minimum,
  maximum,
  allowDecimalPlaces = false,
}: ValidationWholeNumberMinMaxParams) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage.IS_EMPTY, errors);
  }

  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[fieldId]);

  // check if the field is a whole number.
  updatedErrors = numberValidation({ formBody, errors: updatedErrors, errorMessage: errorMessage.INCORRECT_FORMAT, fieldId, allowDecimalPlaces });

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

export default numberMinimumMaximumLength;
