import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import nameValidation from '../../../../../../shared-validation/name';

const {
  LOSS_PAYEE_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validates name field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} errors
 */
const name = (formBody: RequestBody, errors: object) => nameValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default name;
