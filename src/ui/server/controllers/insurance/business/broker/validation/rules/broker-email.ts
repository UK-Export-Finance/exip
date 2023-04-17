import { FIELD_VALUES } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

const {
  BROKER: { EMAIL: FIELD_ID, USING_BROKER },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates email field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const brokerEmail = (responseBody: RequestBody, errors: object) => {
  // if USING_BROKER radio is yes then check validation
  if (responseBody[USING_BROKER] === FIELD_VALUES.YES) {
    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    // checks email is valid
    return emailValidation(FIELD_ID, responseBody[FIELD_ID], errorMessage, errors);
  }

  return errors;
};

export default brokerEmail;
