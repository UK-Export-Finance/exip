import alphaCharactersAndMaxLengthValidation from '../alpha-characters-and-max-length';
import { ACCOUNT_FIELDS } from '../../content-strings/fields/insurance/account';
import { RequestBody, ErrorMessageObject } from '../../../types';

const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

/**
 * nameValidation
 * Check if a name field is valid.
 * Returns alphaCharactersAndMaxLength.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage message
 * @param {Object} errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const nameValidation = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object) =>
  alphaCharactersAndMaxLengthValidation(formBody, fieldId, errorMessages, errors, MAX_CHARACTERS);

export default nameValidation;
