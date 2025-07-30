import minLengthValidation from '../min-length';
import maxLengthValidation from '../max-length';
import { ValidationErrors, ValidationMinAndMaxLengthParams } from '../../../types';

/**
 * Validate an input is not:
 * 1) Below a minimum length
 * 2) Above a maximum length
 * @param {string} value: Field value to validate
 * @param {string} fieldId: Field ID
 * @param {ErrorMessageObject} errorMessages: Error messages
 * @param {object} errors: Errors object from previous validation errors
 * @param {number} minimum: Minimum allowed length
 * @param {number} maximum: Maximum allowed length
 * @returns {ValidationErrors}
 */
const minAndMaxLengthValidation = ({ fieldId, value, errorMessages, errors, minimum, maximum }: ValidationMinAndMaxLengthParams): ValidationErrors => {
  const minValidation: ValidationErrors = minLengthValidation(value, fieldId, errorMessages.BELOW_MINIMUM, errors, minimum);

  /**
   * This condition is required to ensure that "minimum" validation errors are returned,
   * but only if the validation errors has a matching field ID.
   * Without this, this would return "minimum" validation errors for a different field,
   * that is unrelated to the provided field ID>
   */
  if (minValidation?.errorList && minValidation?.errorList[fieldId]) {
    return minValidation;
  }

  const maxValidation = maxLengthValidation(value, fieldId, errorMessages.ABOVE_MAXIMUM, errors, maximum);

  if (maxValidation) {
    return maxValidation;
  }

  return errors;
};

export default minAndMaxLengthValidation;
