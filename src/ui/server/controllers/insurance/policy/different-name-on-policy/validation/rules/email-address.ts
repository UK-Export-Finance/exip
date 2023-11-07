import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

/**
 * validates email field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const emailAddress = (responseBody: RequestBody, errors: object) => emailValidation(FIELD_ID, responseBody[FIELD_ID], errorMessage, errors);

export default emailAddress;
