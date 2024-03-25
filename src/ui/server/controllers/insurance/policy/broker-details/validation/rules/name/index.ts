import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(POLICY_FIELDS.BROKER_DETAILS[FIELD_ID].MAXIMUM);

/**
 * validate the "broker name" field
 * @param {Express.Response.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} Object containing errors or blank object
 */
const brokerName = (responseBody: RequestBody, errors: object) => providedAndMaxLength(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);

export default brokerName;
