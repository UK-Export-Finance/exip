import { objectHasProperty } from '../../helpers/object';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { ACCOUNT_FIELDS } from '../../content-strings/fields/insurance/account';
import { RequestBody, ErrorMessageObject } from '../../../types';

// TODO: update DB schema.
// export const MAXIMUM = 300;
const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

/**
 * nameValidation
 * Check if a name field is valid.
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage message
 * @param {Object} errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const nameValidation = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object) => {
  // TODO: no symbol
  // maybe can adapt this existing definition:
  // const joiString = Joi.string();
  // const schema = () => joiString.alphanum().trim().min(6).required();

  if (objectHasProperty(formBody, fieldId)) {
    return maxLengthValidation(formBody[fieldId], fieldId, errorMessages.ABOVE_MAXIMUM, errors, MAX_CHARACTERS);
  }

  return emptyFieldValidation(formBody, fieldId, errorMessages.IS_EMPTY, errors);
};

export default nameValidation;
