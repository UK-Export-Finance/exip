import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import nameValidation from '../../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../../types';

const {
  AGENT_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

/**
 * validate the "agent name" field
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} nameValidation
 */
const name = (formBody: RequestBody, errors: object) => nameValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.AGENT_NAME);

export default name;
