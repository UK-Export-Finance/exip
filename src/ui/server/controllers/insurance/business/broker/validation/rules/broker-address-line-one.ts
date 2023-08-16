import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  BROKER: { ADDRESS_LINE_1: FIELD_ID, USING_BROKER },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates address line 1 field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const brokerAddressLineOne = (responseBody: RequestBody, errors: object) => {
  if (responseBody[USING_BROKER] === true) {
    return emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default brokerAddressLineOne;
