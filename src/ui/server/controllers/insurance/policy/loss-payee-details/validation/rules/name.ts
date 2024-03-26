import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { RequestBody } from '../../../../../../../types';

const {
  LOSS_PAYEE_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(POLICY_FIELDS.LOSS_PAYEE_DETAILS[FIELD_ID].MAXIMUM);

/**
 * validates name field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const name = (formBody: RequestBody, errors: object) => providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);

export default name;
