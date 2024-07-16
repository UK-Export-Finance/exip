import { REGEX } from '../../constants';
import { objectHasProperty } from '../../helpers/object';
import generateValidationErrors from '../../helpers/validation';
import { isNumberAboveMaximum, isNumberBelowMinimum } from '../../helpers/number';
import stripHyphensAndSpacesFromString from '../../helpers/strip-hyphens-and-spaces-from-string';
import regexValidation from '../regex-validation';
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
 * @returns {ValidationErrors} or null
 */
const numberHyphenSpacesOnlyValidation = (
  formBody: RequestBody,
  fieldId: string,
  errorMessage: ErrorMessageObject,
  errors: object,
  minimum: number,
  maximum: number,
) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage.IS_EMPTY, errors);
  }

  const fieldValue = formBody[fieldId];

  const regex = REGEX.NUMBER_HYPHEN_SPACE;

  const numberHyphenSpaceError = regexValidation(fieldValue, fieldId, regex, errorMessage.INCORRECT_FORMAT, errors);

  if (numberHyphenSpaceError) {
    return numberHyphenSpaceError;
  }

  // replaces and removes hyphens and spaces
  const replaced = stripHyphensAndSpacesFromString(fieldValue);

  // check if the field is below the minimum
  if (isNumberBelowMinimum(replaced.length, minimum)) {
    return generateValidationErrors(fieldId, errorMessage.BELOW_MINIMUM, errors);
  }

  // check if the field is above the maximum
  if (isNumberAboveMaximum(replaced.length, maximum)) {
    return generateValidationErrors(fieldId, errorMessage.ABOVE_MAXIMUM, errors);
  }

  return errors;
};

export default numberHyphenSpacesOnlyValidation;
