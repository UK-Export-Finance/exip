import Joi from 'joi';
import { REGEX } from '../../constants';
import { objectHasProperty } from '../../helpers/object';
import generateValidationErrors from '../../helpers/validation';
import { RequestBody, ErrorMessageObject } from '../../../types';

/**
 * numberHyphenSpacesOnlyValidation
 * Check that a string contains only number, hyphen and space characters
 * Checks that it is within minimum and maximum length
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage
 * @param {Object} errors object from previous validation errors
 * @param {Number} minimum minimum length to check against
 * @param {Number} maximum maximum length to check against
 * @returns {Object} Validation errors or null
 */
const numberHyphenSpacesOnlyValidation = (
  formBody: RequestBody,
  fieldId: string,
  errorMessage: ErrorMessageObject,
  errors: object,
  minimum?: number,
  maximum?: number,
) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage.IS_EMPTY, errors);
  }

  const fieldValue = formBody[fieldId];

  const joiString = Joi.string();

  /**
   * Regex that allows only
   * - numbers
   * - hyphens
   * - spaces
   */
  const regex = REGEX.NUMBER_HYPHEN_SPACE;

  const schema = () => joiString.regex(regex).required();

  const validation = schema().validate(fieldValue);

  if (validation.error) {
    return generateValidationErrors(fieldId, errorMessage.INCORRECT_FORMAT, errors);
  }

  // replaces and removes hyphens and spaces
  const replaced = fieldValue.replaceAll(REGEX.SPACE_AND_HYPHEN_FIND, '');

  // check if the field is below the minimum
  if (minimum && replaced.length < minimum) {
    return generateValidationErrors(fieldId, errorMessage.BELOW_MINIMUM, errors);
  }

  // check if the field is above the maximum
  if (maximum && replaced.length > maximum) {
    return generateValidationErrors(fieldId, errorMessage.ABOVE_MAXIMUM, errors);
  }

  return errors;
};

export default numberHyphenSpacesOnlyValidation;
