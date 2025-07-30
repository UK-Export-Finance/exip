import Joi from 'joi';
import { PhoneNumberUtil } from 'google-libphonenumber';
import generateValidationErrors from '../../helpers/validation';
import { DEFAULT_COUNTRY_UK } from '../../constants';
import { isAboveMaxLength } from '../../helpers/string';

const phoneUtil = PhoneNumberUtil.getInstance();

// regex pattern to only allow numbers, dashes, plus sign and brackets
const pattern = '^[0-9-)(+— ]*$';

/**
 * validates phone number is valid and returns a boolean
 * @param {string} phoneNumber
 * @returns {boolean}
 */
const isPhoneNumberValid = (phoneNumber: string) => phoneUtil.isValidNumberForRegion(phoneUtil.parse(phoneNumber, DEFAULT_COUNTRY_UK), DEFAULT_COUNTRY_UK);

/**
 * joi phone using regex to ensure only numbers and specified special characters are in the string
 * @param {string} phoneNumber
 * @returns {boolean}
 */
const phoneNumberPatternValidation = (phoneNumber: string) => {
  const schema = Joi.string().regex(RegExp(pattern)).required();

  const validation = schema.validate(phoneNumber);

  return validation.error;
};

/**
 * validates phone number is only from the UK and is a valid phone number
 * returns validation error if incorrect format
 * @param {string} phoneNumber
 * @param {string} fieldId
 * @param {string} errorMessage
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} updatedErrors
 */
const validatePhoneNumber = (phoneNumber: string, fieldId: string, errorMessage: string, errors: object) => {
  let updatedErrors = errors;

  // if not valid for UK, then returns validation error
  try {
    if (!isPhoneNumberValid(phoneNumber) || phoneNumberPatternValidation(phoneNumber) || isAboveMaxLength(phoneNumber, 191)) {
      updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);
      return updatedErrors;
    }
  } catch {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);
  }

  return updatedErrors;
};

export default validatePhoneNumber;
