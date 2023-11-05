import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import { RequestBody } from '../../../../../../../../types';
import validatePhoneNumber from '../../../../../../../shared-validation/phone-number';
import { objectHasProperty } from '../../../../../../../helpers/object';

const {
  YOUR_COMPANY: { PHONE_NUMBER },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates phone number input is the correct format
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const phoneNumber = (responseBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  // as field is optional, only validate if it is not an empty string
  if (objectHasProperty(responseBody, PHONE_NUMBER)) {
    const errorMessage = EXPORTER_BUSINESS[PHONE_NUMBER].INCORRECT_FORMAT;
    // validates input
    updatedErrors = validatePhoneNumber(responseBody[PHONE_NUMBER], PHONE_NUMBER, errorMessage, updatedErrors);
  }

  return updatedErrors;
};

export default phoneNumber;
