import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  AGENT_DETAILS: { FULL_ADDRESS: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

/**
 * validate the "full address" field
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const fullAddress = (formBody: RequestBody, errors: object) =>
  providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.FULL_ADDRESS);

export default fullAddress;
