import { PhoneNumberUtil } from 'google-libphonenumber';
import generateValidationErrors from '../../helpers/validation';
import { DEFAULT_COUNTRY_UK } from '../../constants';

const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * validates phone number is only from the UK and is a valid phone number
 * returns validation error if incorrect format
 * @param {string} phoneNumber
 * @param {string} fieldId
 * @param {string} errorMessage
 * @param {object} errors
 * @returns {object} updatedErrors
 */
const validatePhoneNumber = (phoneNumber: string, fieldId: string, errorMessage: string, errors: object) => {
  let updatedErrors = errors;

  // if not valid for UK, then returns validation error
  if (!phoneUtil.isValidNumberForRegion(phoneUtil.parse(phoneNumber, DEFAULT_COUNTRY_UK), DEFAULT_COUNTRY_UK)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default validatePhoneNumber;
