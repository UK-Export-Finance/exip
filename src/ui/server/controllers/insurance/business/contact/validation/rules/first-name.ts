import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import nameValidation from '../../../../../../shared-validation/name';

const { FIRST_NAME: FIELD_ID } = FIELD_IDS;

const {
  CONTACT: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

/**
 * validates last name field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const firstName = (responseBody: RequestBody, errors: object) => nameValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default firstName;
