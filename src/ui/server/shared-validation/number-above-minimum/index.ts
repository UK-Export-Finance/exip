import { ValidationWholeNumberAboveMinimumParams } from '../../../types';
import { objectHasProperty } from '../../helpers/object';
import { stripCommas } from '../../helpers/string';
import generateValidationErrors from '../../helpers/validation';
import numberValidation from '../../helpers/number-validation';

/**
 * numberAboveMinimumValidation
 * Check if a number is provided and below a minimum.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors: Other validation errors for the same form
 * @param {Number} minimum minimum value to check against
 * @param {Boolean} allowDecimalPlaces false as default, if true then allows for decimal places.
 * @returns {ValidationErrors} or null
 */
const numberAboveMinimumValidation = ({
  formBody,
  fieldId,
  errorMessage,
  errors,
  minimum,
  allowDecimalPlaces = false,
}: ValidationWholeNumberAboveMinimumParams) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage.IS_EMPTY, errors);
  }

  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[fieldId]);

  // check if the field is a whole number.
  updatedErrors = numberValidation({ formBody, errors: updatedErrors, errorMessage: errorMessage.INCORRECT_FORMAT, fieldId, allowDecimalPlaces });

  // check if the field is below the minimum
  if (Number(numberWithoutCommas) < minimum) {
    return generateValidationErrors(fieldId, errorMessage.BELOW_MINIMUM, errors);
  }

  return updatedErrors;
};

export default numberAboveMinimumValidation;
