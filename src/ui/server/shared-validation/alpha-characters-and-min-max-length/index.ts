import alphaCharactersOnlyValidation from '../alpha-characters-only';
import minAndMaxLengthValidation from '../min-and-max-length';
import { ValidationErrors, ValidationMinAndMaxLengthParams } from '../../../types';

/**
 * alphaCharactersAndMinMaxLength
 * Check if a field is:
 * 1) Provided
 * 2) Has only alpha characters
 * 3) Is not below a minimum length
 * 4) Is not over a maximum length
 * Returns generateValidationErrors if there are any errors.
 * @param {String} fieldId: Field ID
 * @param {Object} errorMessages: Error messages
 * @param {Object} errors: Object from previous validation errors
 * @param {Integer} minimum: Minimum length of characters
 * @param {Integer} maximum: Maximum length of characters
 * @returns {ValidationErrors}
 */
const alphaCharactersAndMinMaxLength = ({ fieldId, value, errorMessages, errors, minimum, maximum }: ValidationMinAndMaxLengthParams): ValidationErrors => {
  const alphaCharactersOnlyError = alphaCharactersOnlyValidation(value, fieldId, errorMessages.INCORRECT_FORMAT, errors);

  if (alphaCharactersOnlyError) {
    return alphaCharactersOnlyError;
  }

  return minAndMaxLengthValidation({
    fieldId,
    value,
    errorMessages,
    errors,
    minimum,
    maximum,
  });
};

export default alphaCharactersAndMinMaxLength;
