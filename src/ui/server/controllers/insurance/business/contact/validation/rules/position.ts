import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  CONTACT: { POSITION: FIELD_ID },
} = FIELD_IDS;

const {
  CONTACT: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

/**
 * validates position field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const position = (responseBody: RequestBody, errors: object) => emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default position;
