import isUrl from 'is-url';
import generateValidationErrors from '../../helpers/validation';
import isAboveMaxLength from '../../helpers/is-above-max-length';

/**
 * validates website string and adds errorMessage and fieldId to errors if not in the correct format
 * @param {string} website
 * @param {string} fieldId
 * @param {string} errorMessage
 * @param {object} errors
 * @returns {object} errors
 */
const validateWebsiteAddress = (website: string, fieldId: string, errorMessage: string, errors: object) => {
  let updatedErrors = errors;

  // if not correct url, or is over 191 characters then will be false
  if (!isUrl(website) || isAboveMaxLength(website, 191)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default validateWebsiteAddress;
