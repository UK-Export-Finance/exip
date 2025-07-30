import generateValidationErrors from '../../helpers/validation';
import isValidWebsiteAddress from '../../helpers/is-valid-website-address';

/**
 * validates website string and adds errorMessage and fieldId to errors if not in the correct format
 * @param {string} website
 * @param {string} fieldId
 * @param {string} errorMessage
 * @param {object} errors: Other validation errors for the same form
 * @returns {ValidationErrors}
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
