import { postcodeValidator } from 'postcode-validator';
import generateValidationErrors from '../../helpers/validation';

/**
 * postCodeValidation
 * Check if an postcode is valid
 * Returns generateValidationErrors if there are any errors or if is empty.
 * @param {String} fieldId
 * @param {String} postcode
 * @param {String} errorMessageEmpty error message if postcode is empty
 * @param {String} errorMessageFormat error message if postcode is the incorrect format
 * @param {Object} errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const postCodeValidation = (fieldId: string, postcode: string, errorMessageEmpty: string, errorMessageFormat: string, errors: object) => {
  try {
    if (!postcode) {
      return generateValidationErrors(fieldId, errorMessageEmpty, errors);
    }

    // check if the postcode is a valid UK postcode.
    if (!postcodeValidator(postcode, 'GB')) {
      return generateValidationErrors(fieldId, errorMessageFormat, errors);
    }
  } catch (err) {
    return errors;
  }

  return errors;
};

export default postCodeValidation;
