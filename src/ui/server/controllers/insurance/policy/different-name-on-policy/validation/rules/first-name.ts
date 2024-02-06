import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import nameValidation from '../../../../../../shared-validation/name';

const { FIRST_NAME: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validates last name field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {object} errors
 * @returns {object} errors
 */
const firstName = (formBody: RequestBody, errors: object) => nameValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default firstName;
