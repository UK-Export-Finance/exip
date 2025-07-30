import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import nameValidation from '../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../types';

const {
  LOSS_PAYEE_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validates name field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} nameValidation
 */
const name = (formBody: RequestBody, errors: object) => nameValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME);

export default name;
