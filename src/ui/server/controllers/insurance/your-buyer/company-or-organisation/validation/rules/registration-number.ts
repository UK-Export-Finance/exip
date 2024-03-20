import { ERROR_MESSAGES } from '../../../../../../content-strings';
import BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { objectHasProperty } from '../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../types';

const {
  COMPANY_OR_ORGANISATION: { REGISTRATION_NUMBER: FIELD_ID },
} = BUYER_FIELD_IDS;

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: {
      [FIELD_ID]: { ABOVE_MAXIMUM: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

export const MAXIMUM = Number(FIELDS.COMPANY_OR_ORGANISATION[FIELD_ID].MAXIMUM);

/**
 * validate the REGISTRATION_NUMBER field
 * check if answer has been provided and if so, check it is not over a maximum length.
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} errors
 */
const registrationNumber = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, FIELD_ID)) {
    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, errors, MAXIMUM);
  }

  return errors;
};

export default registrationNumber;
