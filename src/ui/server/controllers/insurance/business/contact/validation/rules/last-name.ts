import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  CONTACT: { LAST_NAME: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates last name field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const lastName = (responseBody: RequestBody, errors: object) => emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default lastName;
