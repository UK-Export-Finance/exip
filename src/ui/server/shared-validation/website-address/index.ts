import generateValidationErrors from '../../helpers/validation';
import isValidWebsiteAddress from '../../helpers/is-valid-website-address';

/**
 * validates website string and adds errorMessage and fieldId to errors if not in the correct format
 * @param {String} website
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors
 * @returns {Object} Validation errors
 */
const validateWebsiteAddress = (website: string, fieldId: string, errorMessage: string, errors: object) => {
  let updatedErrors = errors;

  if (!isValidWebsiteAddress(website)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default validateWebsiteAddress;
