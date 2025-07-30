import { postcodeValidator } from 'postcode-validator';
import generateValidationErrors from '../../helpers/validation';

/**
 * postcodeValidation
 * Check if an postcode is valid
 * Returns generateValidationErrors if there are any errors or if is empty.
 * @param {string} fieldId
 * @param {string} postcode
 * @param {string} errorMessageEmpty error message if postcode is empty
 * @param {string} errorMessageFormat error message if postcode is the incorrect format
 * @param {object} errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const postcodeValidation = (fieldId: string, postcode: string, errorMessageEmpty: string, errorMessageFormat: string, errors: object) => {
  try {
    if (!postcode) {
      return generateValidationErrors(fieldId, errorMessageEmpty, errors);
    }

    // check if the postcode is a valid UK postcode.
    if (!postcodeValidator(postcode, 'GB')) {
      return generateValidationErrors(fieldId, errorMessageFormat, errors);
    }
  } catch (error) {
    return errors;
  }

  return errors;
};

export default postcodeValidation;
