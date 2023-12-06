import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

const {
  BROKER: { EMAIL: FIELD_ID, USING_BROKER },
} = FIELD_IDS;

const {
  POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates email field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const brokerEmail = (responseBody: RequestBody, errors: object) => {
  if (responseBody[USING_BROKER] === true) {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    // checks email is valid
    return emailValidation(FIELD_ID, responseBody[FIELD_ID], errorMessage, errors);
  }

  return errors;
};

export default brokerEmail;
