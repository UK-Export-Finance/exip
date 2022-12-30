import isUrl from 'is-url';
import generateValidationErrors from '../../helpers/validation';

/**
 * validates website string and adds errorMessage and fieldId to errors if not in the correct formap
 * @param {string} website
 * @param {string} fieldId
 * @param {string} errorMessage
 * @param {object} errors
 * @returns {object} errors
 */
const validateWebsiteAddress = (website: string, fieldId: string, errorMessage: string, errors: object) => {
  let updatedErrors = errors;

  // if not correct url, then will be false
  if (!isUrl(website)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default validateWebsiteAddress;
