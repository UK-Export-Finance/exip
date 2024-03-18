import minLengthValidation from '../min-length';
import maxLengthValidation from '../max-length';
import isPopulatedArray from '../../helpers/is-populated-array';
import { ValidationErrors, ValidationMinAndMaxLengthParams } from '../../../types';

/**
 * validates field character count input is not:
 * 1) Below a minimum length
 * 2) Above a maximum length
 * @param {String} value: Field value to validate
 * @param {String} fieldId: Field ID
 * @param {ErrorMessageObject} errorMessages: Error messages
 * @param {Object} errors: Errors object from previous validation errors
 * @param {Integer} minimum: Minimum allowed length
 * @param {Integer} maximum: Maximum allowed length
 * @returns {ValidationErrors}
 */
const minAndMaxLengthValidation = ({ fieldId, value, errorMessages, errors, minimum, maximum }: ValidationMinAndMaxLengthParams): ValidationErrors => {
  const minValidation = minLengthValidation(value, fieldId, errorMessages.BELOW_MINIMUM, errors, minimum);

  if (isPopulatedArray(minValidation.summary)) {
    return minValidation;
  }

  const maxValidation = maxLengthValidation(value, fieldId, errorMessages.ABOVE_MAXIMUM, errors, maximum);

  if (maxValidation) {
    return maxValidation;
  }

  return errors;
};

export default minAndMaxLengthValidation;
