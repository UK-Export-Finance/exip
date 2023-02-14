import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import postCodeValidation from '../../../../../../shared-validation/postcode';

const {
  BROKER: { POSTCODE: FIELD_ID, USING_BROKER },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates postcode field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const brokerPostcode = (responseBody: RequestBody, errors: object) => {
  // if USING_BROKER radio is yes then check validation
  if (responseBody[USING_BROKER] === 'Yes') {
    // validates if postcode is empty or the wrong format
    return postCodeValidation(FIELD_ID, responseBody[FIELD_ID], ERROR_MESSAGE.IS_EMPTY, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  return errors;
};

export default brokerPostcode;
